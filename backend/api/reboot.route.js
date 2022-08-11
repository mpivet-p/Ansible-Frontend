import express from "express";
import * as child_process from 'child_process';
import prepareResponse from "./utils/prepareResponse.js";

const router = express.Router()

function sendResponse(res, output) {
    let response_content = prepareResponse(output);

    if (response_content["hosts_success"].length > 0) {
        response_content["success_msgs"] = [`SUCCESS: ${response_content["hosts_success"].length} computers rebooted.`];
    }
    res.status(200).json(response_content);
}

router.route('/').post((req, res) => {
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var command = `${process.env.CMD_PREFIX} ansible -bm reboot "${stations}"`

    console.log(`${req.headers.auth42} -> {${command}}`);

    child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        console.log(stdout);
        sendResponse(res, stdout);
    });
});

export default router;

    // var result = command.exec();

    // result.then((success) => {
    //     let output = JSON.parse(success.output);
    //     console.log("Command success!");
    //     console.log(output["plays"][0]["tasks"][0]["hosts"]);
    //     res.status(200).json({
    //         status_msg: "Task Completed!"
    //     });
    // }, (err) => {
    //     let output = JSON.parse(err.output);
    //     console.log("Command error!");
    //     console.log(output["plays"][0]["tasks"][0]["hosts"]);
    // });
