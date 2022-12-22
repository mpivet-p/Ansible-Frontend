const fs = require('fs');
const YAML = require('js-yaml');

function readConfigs(req, res) {
    const dirPath = "../playbooks-config/";
    var confs = {};
    const dirContent = fs.readdirSync(dirPath);
    dirContent.forEach(file => {
        const raw = fs.readFileSync(dirPath + file);
        const data = YAML.load(raw);
        confs[data.taskName] = data;
    });
    return (confs);
}

module.exports = readConfigs;