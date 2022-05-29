import express from "express";
import ansible from "node-ansible";

const router = express.Router()


router.route('/').post((req, res) => {
    var stations = req.body.stations.map(str => str + ".42madrid.com").join(',');

    var test = new ansible.AdHoc().hosts(stations).module('shell').args("reboot");
    test.asSudo();
    var aa = test.exec();
    aa.then(function(result) {
        console.log(result.output);
        console.log(result.code);
    }, function(err) {
        console.log(err);
    });

    res.status(200).json({
        status: "Reboots launched!"
    });
});

export default router;