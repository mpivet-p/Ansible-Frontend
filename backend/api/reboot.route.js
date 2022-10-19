const child_process = require('child_process');
const prepareResponse = require("../utils/prepareResponse.js");

function sendResponse(res, output) {
    let response_content = prepareResponse(output);

    if (response_content["hosts_success"].length > 0) {
        response_content["success_msgs"] = [`SUCCESS: ${response_content["hosts_success"].length} computers rebooted.`];
    }
    res.status(200).json(response_content);
}

async function reboot(req, res) {
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
}

module.exports = reboot;