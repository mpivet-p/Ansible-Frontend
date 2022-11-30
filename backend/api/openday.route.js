const executeCommand = require("../utils/executeCommand");

async function openday(req, res) {
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var command = `${process.env.CMD_PREFIX} ansible-playbook ../playbooks/openday/playbook/openday.yml -f 300 --limit "${stations}" --extra-vars background=openDayEvent.png --extra-vars version=${req.body.pdf} --tags "start,pdf"`

    const formatSuccessMsg = (insert) => {
        return (`SUCCESS: link opened on ${insert} computer(s) ready for openday.`);
    };
    executeCommand(req, res, command, formatSuccessMsg, "Openday On"); 
}

module.exports = openday;
