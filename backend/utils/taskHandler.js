const executeCommand = require("./executeCommand");

async function taskHandler(confs, req, res) {
    try {
        var stations = req.body.stations.map(str => str + `.${process.env.CAMPUS_DOMAIN}`).join(',');
        const playbook = confs[req.body.taskName];

        var command = `${process.env.CMD_PREFIX} ${playbook.command}`;

        if (playbook.clusterTask === true) {
            if (playbook.playbook === true) {
                command += ` --limit "${stations}"`;
            } else {
                command += ` "${stations}"`;
            }
        }

        if (playbook.extraVars) {
            for (const elem in req.body.extraVars) {
                command += ` --extra-vars ${elem}='${req.body.extraVars[elem]}'`
            }
        }
        if (playbook.tags) {
            command += ` --tags ${playbook.tags}`;
        }

        const formatSuccessMsg = (insert) => {
            return (`SUCCESS:  ${insert}`);
        };
        if (playbook.clusterTask === true) {
            command += " -f 300";
            executeCommand(req, res, command, formatSuccessMsg, playbook.displayName);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Oops");
    }
}

module.exports = taskHandler;
