// ansible -ba 'rm -rf /event/{Desktop,Downloads,Documents,.Trash,.vscode}/* ' -f 300 "c3*"
//  9884  ansible-playbook ~/events/openday/playbook/openday.yml -f 300 --limit "c3r1[0-4]s*" --extra-vars background=openDayEvent.png --extra-vars version=c --tags "start,pdf"
import express from "express";

const router = express.Router()
import * as child_process from 'child_process';

function sendResponse(res, output) {
    output = JSON.parse(output);

    let hosts_results = output["plays"][0]["tasks"][0]["hosts"];
    let response_content = {
        success_msgs: [],
        failure_msgs: [],
        hosts_success: [],
        hosts_failed: []
    }

    for (var key in hosts_results) {
        if (hosts_results[key]["failed"] != true) {
            response_content["hosts_success"].push(key.slice(0, -13));
        } else {
            response_content["hosts_failed"].push(key.slice(0, -13));
        }
    }

    if (response_content["hosts_success"].length > 0) {
        response_content["success_msgs"] = [`SUCCESS: ${response_content["hosts_success"].length} `];
    }
    if (response_content["hosts_failed"].length > 0) {
        response_content["failure_msgs"] = [`ERROR: ${response_content["hosts_failed"].join(', ')}`];
    }
    res.status(200).json(response_content);
}

router.route('/').post((req, res) => {
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var command = `ansible -ba 'rm -rf /event/{Desktop,Downloads,Documents,.Trash,.vscode}/*' -f 300 "${stations}"; ansible-playbook playbooks/openday.yml -f 300 --limit "${stations}" --extra-vars background=openDayEvent.png --extra-vars version=${req.body.openday_version} --tags "start,pdf"`

    console.log(`${req.body.task} requested for ${req.body.stations.join(',')}`);

    child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(stderr);
        }
        console.log(stdout);
        //sendResponse(res, stdout);
    });
});

export default router;