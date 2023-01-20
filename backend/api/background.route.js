const executeCommand = require("../utils/executeCommand");

async function background(req, res) {
    var stations = req.body.stations.map(str => str + `.${process.env.CAMPUS_DOMAIN}`).join(',');

    var command = `${process.env.CMD_PREFIX} ansible-playbook ../playbooks/background-change.yml -f 300 --limit "${stations}" --extra-vars background=${req.body.background}`

    const formatSuccessMsg = (insert) => {
        return (`SUCCESS: ${insert} hosts' background changed.`);
    };
    executeCommand(req, res, command, formatSuccessMsg, "Background Change"); 
}

module.exports = background;
