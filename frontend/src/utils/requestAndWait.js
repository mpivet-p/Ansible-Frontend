import generateAlert from './generateAlert.js';
import getSelected from "./getSelected";
import axios from "axios"

function requestAndWait(endpoint, vars) {
    //POST request to express.JS containing the array and the type of operation requested
    vars.stations = getSelected();
    if (vars.stations.length > 0) {
        axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");
        axios.post(endpoint, vars)
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                window.location.href = process.env.REACT_APP_AUTH_LINK;
            } else {
                for (let i = 0; i < response.data["success_msgs"].length; i++) {
                    generateAlert("alert-success", response.data["success_msgs"][i]);
                }
                for (let i = 0; i < response.data["failure_msgs"].length; i++) {
                    generateAlert(null, response.data["failure_msgs"][i]);
                }
            }
        })
        .catch(err => console.log(err));
        generateAlert("alert-info", `${vars.taskName} sent to ${vars.stations.length} computer(s)`);
    }
}

export default requestAndWait;
