require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("./model/user");
const Action = require("./model/action");
const auth = require("./middleware/auth");
const onlyAdmin = require("./middleware/onlyAdmin");
const getTokensFromEmail = require("./utils/getTokens");

// API routes
const background = require("./api/background.route.js");
const background_upload = require("./api/upload-background.route.js");
const background_list = require("./api/background-list.route");
const taskList = require("./api/taskList.js");

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// ROUTES AUTO SETUP
const readConfigs = require("./utils/readConfigs.js");
const playbooksConfigs = readConfigs();
const setupRoutesFromConfigs = require('./utils/setupRoutes.js')(app, playbooksConfigs);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../playbooks/backgrounds/')
  },
  filename: (req, file, cb) => {
    cb(null, encodeURIComponent(file.originalname))
  },
})

const upload = multer({ storage: storage })

app.post("/api/background", auth, background);
app.post("/api/background/upload", [auth, upload.single('background-upload')], background_upload);
app.get("/api/background/list", auth, background_list);
app.get("/api/task-list", auth, taskList.bind(null, playbooksConfigs));

app.post("/welcome", auth, (req, res) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
        ;
    }
    res.status(200).send("Welcome 🙌 ");
});

app.get("/check_token", auth, (req, res) => {
  console.log("check_token valid.")
  res.status(200).send("Token is valid!");
});

app.get("/user", auth, async (req, res) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const resultUser = await (await User.findOne({ email: decoded.email }, { email: 1, kind: 1, _id: 0 })).toJSON();
        res.status(200).send(resultUser);
    } catch (err) {
        console.log(err);
    }
});

app.get("/users", onlyAdmin, async (req, res) => {
    try {
        const resultUsers = await User.find({}, { email: 1, kind: 1, _id: 0 });
        res.status(200).send(resultUsers);
    } catch (err) {
        console.log(err);
    }
});

app.get("/actions", auth, async (req, res) => {
    var page = (req.query.page <= 1) ? 0 : req.query.page - 1;
    const page_size = 8;
    try {
        const resultActions = await Action.find({}, { __v: 0 }).sort({$natural:-1}).skip(page_size * page).limit(page_size);
        var items_left = await Action.count() - (page_size * page + page_size);
        if (items_left <= 0)
            items_left = 0;
        res.setHeader("pages-left", Math.ceil(items_left / page_size));
        res.setHeader("items-left", items_left > 0 ? items_left : 0);
        res.setHeader("Access-Control-Expose-Headers", "pages-left,items-left")
        res.status(200).send(resultActions);
    } catch (err) {
        console.log(err);
    }
});

app.get("/actions/:id*", auth, async (req, res) => {
    try {
      var id = req.params.id;
      if (id.length != 24) {
        res.status(300).send("Action's id length must be 24");
      }
      const resultAction = await Action.find({ _id: id }, { __v: 0 });
      res.status(200).send(resultAction);
    } catch(err) {
        console.log(err);
    }
});

app.post("/register", onlyAdmin, async (req, res) => {
  try {

    const { email, password, kind } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email.toLowerCase(),
      kind: (kind) ? kind.toLowerCase() : "user",
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }

});

app.post("/refresh_token", async (req, res) => {
  try {
    const refreshToken = req.body["refresh-token"] || req.query.refreshToken || req.headers["refresh-token"];
    if (!refreshToken) {
      return res.status(403).send("A token is required for refresh");
    }
    const decoded = jwt.verify(refreshToken, process.env.TOKEN_KEY);
    if (!(decoded.refresh)) {
      return(res.status(400).json("Refresh Token only allowed for /refresh"));
    }
    const email = decoded.email;
    const user = await User.findOne({ email });
    return res.status(200).json(await getTokensFromEmail(email, user));
  } catch (err) {
    console.log(err);
  }
});

app.post("/update", onlyAdmin, async (req, res) => {
    try {
      const { email, kind } = req.body;
      // Validate user input
      if (!(email && kind)) {
        res.status(400).send("All input is required");
      }
  
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
          res.status(409).send("User does not exists");
      }
  
      const user = await User.updateOne({email: email}, {$set: {kind: kind}});
  
      return (res.status(201).json("Success"));
    } catch (err) {
      console.log(err);
    }
  
});

app.post("/changepwd", auth, async (req, res) => {
  try {
    const { user, password } = req.body;

    let email = "";
    //Check the sender is admin if trying to modify an other user
    if (user) {
      const adminCheck = await User.findOne({ email: user });
      if (!adminCheck) {
          return (res.status(409).send("User does not exists"));
      }
      email = user;
    } else {
      email = req.user.email;
    }

    // Validate user input
    if (!(password)) {
      return res.status(400).send("Password is required!");
    }
    if (password.length < 8) {
      return res.status(400).send("Password must be at least 8 characters long");
    }
    const userCheck = await User.findOne({ email: email });
    if (!userCheck) {
        return (res.status(409).send("User does not exists"));
    }

    //Actual Modification
    encryptedPassword = await bcrypt.hash(password, 10);
    const userUpdate = await User.updateOne({email: email}, {$set: {password: encryptedPassword}});

    return res.status(201).json(await getTokensFromEmail(userCheck.email, userCheck));
  } catch (err) {
    console.log(err);
  }

});

app.post("/login", async (req, res) => {

    try {
      const { email, password } = req.body;
 
      // Validate user input
      if (!(email && password)) {
        return (res.status(400).send("All input is required"));
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json(await getTokensFromEmail(email, user));
      }
      return (res.status(400).send("Invalid Credentials"));
    } catch (err) {
      console.log(err);
    }
});

module.exports = app;
