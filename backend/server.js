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
import session from "express-session";
import { Strategy } from "passport-42";
import testhdl from './testhdl.js';


passport.use(new Strategy({
    clientID: process.env.API42CT_ID,
    clientSecret: process.env.API42CT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken);
    console.log(refreshToken);
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

app.use(session({ resave: false, saveUninitialized: false, secret: '!terceS' }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/api/auth',
  passport.authenticate('42'));

app.get('/api/auth/callback',
  passport.authenticate('42', { failureRedirect: '/login' }),
  function(req, res) {
    if (req.user["_json"]["staff?"] != true)
      res.redirect('http://localhost:3000');
    res.redirect(`http://localhost:3000/auth?access_token=${req.user.token}`);
  }
);

app.use(testhdl);

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

export default app