import express from "express";
import cors from "cors";
import user from "./api/user.route.js";
import reboot from './api/reboot.route.js';
import ping from './api/ping.route.js';
import openday from './api/openday.route.js';
import background from './api/background.route.js';
import auth from './api/auth.route.js';
import openLink from './api/open-link.route.js'
import passport from 'passport';
import { Strategy } from "passport-42";
import check_auth from './check_auth.js';
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;

passport.use(new Strategy({
    clientID: process.env.API42CT_ID,
    clientSecret: process.env.API42CT_SECRET,
    callbackURL: `${process.env.address}:5000/api/auth/callback"`
  },
  function(accessToken, refreshToken, profile, cb) {
    profile["token"] = accessToken;
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const app = express();
app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());


app.get('/api/auth/callback',
  passport.authenticate('42', { failureRedirect: `${process.env.address}/auth?failed=true` }),
  function(req, res) {
    if (req.user["_json"]["staff?"] != true)
      res.redirect(`${process.env.address}/auth?failed=true`);
    res.redirect(`${process.env.address}/auth?access_token=${req.user.token}`);
  }
);

app.use(check_auth);

app.get('/api/auth', (req, res) => res.status(200));

app.use('/api/user/', user);
app.use('/api/openday/start', openday);
app.use('/api/openlink', openLink);
app.use('/api/reboot', reboot);
app.use('/api/background', background);
app.use('/api/ping', ping);

app.use('*', (req, res) => res.status(404).json({error: "Not found"}));

//CORS OPTIONS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
