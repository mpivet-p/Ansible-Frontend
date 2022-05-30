import express, { response } from "express";
import ansible from "node-ansible";

const router = express.Router()
import * as child_process from 'child_process';

function sendResponse(res, output) {
    output = JSON.parse(output);

    let hosts_results = output["plays"][0]["tasks"][0]["hosts"];
    let response_content = {
        status_msg: "Task Completed!",
        hosts_success: [],
        hosts_failed: []
    }

    for (var key in hosts_results) {
        if (hosts_results[key]["failed"] == true) {
            response_content["hosts_failed"].push(key);
        } else {
            response_content["hosts_success"].push(key);
        }
    }
    res.status(200).json(response_content);
}

router.route('/').post((req, res) => {
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    if (req.body.task == "reboot") {
        var command = `ansible -bm reboot "${stations}"`
    } else {
        var command = `ansible -m ping "${stations}" --task-timeout 5`
    }
    console.log(`${req.body.task} requested for ${req.body.stations.join(',')}`);

    child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        console.log(stdout);
        sendResponse(res, stdout);
    });
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
});

export default router;