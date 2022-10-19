const prepareResponse = require('../utils/prepareResponse.js');
const child_process = require('child_process');

function sendResponse(res, output) {
    let response_content = prepareResponse(output);

    if (response_content["hosts_success"].length > 0) {
        response_content["success_msgs"] = [`SUCCESS: link opened on ${response_content["hosts_success"].length} computer(s)`];
    }
    res.status(200).json(response_content);
}

async function open_link(req, res){
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var command = `${process.env.CMD_PREFIX} ansible-playbook ../playbooks/impersonate.yml -f 300 --limit "${stations}" --extra-vars command="open '/Applications/${req.body.browser}' '${req.body.link}'"`

    console.log(`${req.user.email} -> {${command}}`);

    child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        sendResponse(res, stdout);
    });
}

module.exports = open_link;
