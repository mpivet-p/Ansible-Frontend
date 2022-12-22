async function taskList(confs, req, res) {

    res.status(200).json(Object.values(confs)); 
}

module.exports = taskList;