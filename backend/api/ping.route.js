const prepareResponse = require('../utils/prepareResponse.js');
const child_process = require('child_process');

function sendResponse(res, output) {
    let response_content = prepareResponse(output);

    if (response_content["hosts_success"].length > 0) {
        response_content["success_msgs"] = [`SUCCESS: ${response_content["hosts_success"].length} pong.`];
    }
    res.status(200).json(response_content);
}

async function ping(req, res) {
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var command = `${process.env.CMD_PREFIX} ansible -m ping "${stations}" -T 5`

    console.log(`${req.user.email} -> {${command}}`);

    await child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        sendResponse(res, stdout);
    });
}

module.exports = ping;