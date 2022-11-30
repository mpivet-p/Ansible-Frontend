const executeCommand = require("../utils/executeCommand.js");

async function ping(req, res) {
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var command = `${process.env.CMD_PREFIX} ansible -m ping "${stations}" -T 5`
    const formatSuccessMsg = (insert) => {
        return (`SUCCESS: ${insert} pong.`);
    };
    executeCommand(req, res, command, formatSuccessMsg, "Ping");  
}

module.exports = ping;