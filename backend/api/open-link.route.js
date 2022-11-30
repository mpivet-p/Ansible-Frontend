const executeCommand = require("../utils/executeCommand");

async function open_link(req, res){
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var command = `${process.env.CMD_PREFIX} ansible-playbook ../playbooks/impersonate.yml -f 300 --limit "${stations}" --extra-vars command="open '/Applications/${req.body.browser}' '${req.body.link}'"`

    const formatSuccessMsg = (insert) => {
        return (`SUCCESS: link opened on ${insert} hosts.`);
    };
    executeCommand(req, res, command, formatSuccessMsg, "Open Link"); 
}

module.exports = open_link;
