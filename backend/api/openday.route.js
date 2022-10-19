const prepareResponse = require('../utils/prepareResponse.js');
const child_process = require('child_process');

function sendResponse(res, output) {
    let response_content = prepareResponse(output);

    if (response_content["hosts_success"].length > 0) {
        response_content["success_msgs"] = [`SUCCESS: ${response_content["hosts_success"].length} computer(s) ready for openday`];
    }
    res.status(200).json(response_content);
}

async function openday(req, res) {
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var command = `${process.env.CMD_PREFIX} ansible-playbook ../playbooks/openday/playbook/openday.yml -f 300 --limit "${stations}" --extra-vars background=openDayEvent.png --extra-vars version=${req.body.pdf} --tags "start,pdf"`

    console.log(`${req.user.email} -> {${command}}`);

    child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        sendResponse(res, stdout);
    });
}

module.exports = openday;
