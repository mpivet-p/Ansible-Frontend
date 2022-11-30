const executeCommand = require("../utils/executeCommand");

async function reboot(req, res) {
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var command = `${process.env.CMD_PREFIX} ansible -bm reboot "${stations}"`

    const formatSuccessMsg = (insert) => {
        return (`SUCCESS: ${insert} computer(s) rebooted.`);
    };
    executeCommand(req, res, command, formatSuccessMsg, "Reboot"); 
}

module.exports = reboot;