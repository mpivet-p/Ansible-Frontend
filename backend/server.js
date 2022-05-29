import express from "express"
import cors from "cors"
import user from "./api/user.route.js"
import reboot from './api/reboot.route.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user/', user);
app.use('/api/reboot', reboot);
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