import generateAlert from './generateAlert.js';
import getSelected from "./getSelected";
import getCookie from './getCookie.js'

function requestAndWait(endpoint, vars) {
    //POST request to express.JS containing the array and the type of operation requested
    vars.stations = getSelected();
    if (vars.stations.length > 0) {
        vars.auth_code = getCookie("clustersToolsAuth");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            auth_code: getCookie("clustersToolsAuth"),
            body: JSON.stringify(vars)
        };
        fetch(endpoint, requestOptions)
            .then((response) => {
                return (response.json());
            }).then((response_content) => {
                if (!response_content['error']) {
                    for (let i = 0; i < response_content["success_msgs"].length; i++) {
                        generateAlert("alert-success", response_content["success_msgs"][i]);
                    }
                    for (let i = 0; i < response_content["failure_msgs"].length; i++) {
                        generateAlert(null, response_content["failure_msgs"][i]);
                    }
                }
            });
    }
}

export default requestAndWait;