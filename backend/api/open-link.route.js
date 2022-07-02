import express from "express";
import prepareResponse from './utils/prepareResponse.js';
import * as child_process from 'child_process';

const router = express.Router()

function sendResponse(res, output) {
    let response_content = prepareResponse(output);

    if (response_content["hosts_success"].length > 0) {
        response_content["success_msgs"] = [`SUCCESS: link opened on ${response_content["hosts_success"].length} computer(s)`];
    }
    res.status(200).json(response_content);
}

router.route('/').post((req, res) => {
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var command = `ansible-playbook ../playbooks/impersonate.yml -f 300 --limit "${stations}" --extra-vars "open /Applications/${req.body.browser} ${req.body.link}"`

    console.log(`${req.body.task} requested for ${req.body.stations.join(',')}`);

    child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(stderr);
        }
        // console.log(stdout);
        sendResponse(res, stdout);
    });
});

export default router;