import express from "express";
import fetch from 'node-fetch';

const router = express.Router()

router.route('/').post((req, res) => {
    const payload = {
        grant_type: "authorization_code",
        client_id: process.env.API42_UID,
        client_secret: process.env.API42_SECRET,
        code: req.body.auth_code,
        redirect_uri: `${process.env.address}:5000/auth`
      };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    fetch("https://api.intra.42.fr/oauth/token", requestOptions)
        .then((response) => {
            return (response.json());
        }).then((response_content) => {
            res.status(200).json(response_content);
        });
});

export default router;