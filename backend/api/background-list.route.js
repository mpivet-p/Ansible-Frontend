const path = require('path');
const fs = require('fs');

async function background_list(req, res) {
    const directoryPath = path.join(__dirname, '../../playbooks/backgrounds');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.log(err);
            res.status(501).send("fs.readdir error!");
        }
        res.status(200).json({"files": files});
    });
    
}

module.exports = background_list;