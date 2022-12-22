const taskHandler = require("./taskHandler");
const auth = require("../middleware/auth");

module.exports = function(app, confs) {
    for (const element in confs) {
        app.post(confs[element].route, auth, taskHandler.bind(null, confs));
    }
}