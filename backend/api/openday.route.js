import express from "express";
import prepareResponse from './utils/prepareResponse.js';
import * as child_process from 'child_process';

const router = express.Router()

function sendResponse(res, output) {
    let response_content = prepareResponse(output);

    if (response_content["hosts_success"].length > 0) {
        response_content["success_msgs"] = [`SUCCESS: ${response_content["hosts_success"].length} computer(s) ready for openday`];
    }
    res.status(200).json(response_content);
}

router.route('/').post((req, res) => {
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var command = `${process.env.CMD_PREFIX} ansible-playbook ../playbooks/openday/playbook/openday.yml -f 300 --limit "${stations}" --extra-vars background=openDayEvent.png --extra-vars version=${req.body.pdf} --tags "start,pdf"`

    console.log(`${req.headers.auth42} -> {${command}}`);

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
