const child_process = require('child_process');
const Action = require("../model/action");
const prepareResponse = require("./prepareResponse.js")

async function recordAction(hosts, from, command, taskName) {
    const action = await Action.create({
        hosts: hosts,
        from: from,
        task: taskName,
        command: command,
        created_at: new Date()
    });
    return (action._id);
}

async function completeAction(id, stdout, response_content) {
    const actionUpdate = await Action.updateOne({_id: id}, {$set: {
        result: stdout,
        done_at: new Date(),
        hosts_successful: response_content["hosts_success"],
        hosts_unreachable: response_content["hosts_unreachable"]
    }});
    return (actionUpdate._id);
}

async function executeCommand(req, res, command, formatSuccessMsg, taskName) {
    const current = new Date();
    console.log(`${current.toLocaleDateString('es-ES')} ${current.toLocaleTimeString('es-ES')} ${req.user.email}: ${taskName}`);
    const id = await recordAction(req.body.stations, req.user.email, command, taskName);
    await child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        // console.log(stdout)
        let response_content = prepareResponse(stdout);
        // response_content["hosts_success"] = ["c2r12s5.42madrid.com"]; // Only for development
        // // response_content["hosts_success"] = []; // Only for development
        // // response_content["hosts_failed"] = ["c1r1s1.42madrid.com"]; // Only for development
        completeAction(id, stdout, response_content);
        if (response_content["hosts_success"].length > 0) {
            response_content["success_msgs"] = [formatSuccessMsg(response_content["hosts_success"].length)];
        }
        res.status(200).json(response_content);
    });
}

module.exports = executeCommand;