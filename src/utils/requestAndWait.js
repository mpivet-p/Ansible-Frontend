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
            headers: {
                'Content-Type': 'application/json',
                'Auth42': getCookie("clustersToolsAuth")
            },
            body: JSON.stringify(vars)
        };
        fetch(endpoint, requestOptions)
            .then((response) => {
                if (response.status === 401 || response.status === 403) {
                    window.location.href = "https://api.intra.42.fr/oauth/authorize?client_id=0f6655021889bb245a232b995a310a771b26fa2a2bfae2252d7e308e5c2ba7d0&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fcallback&response_type=code";
                }
                return (response.json());
            }).then((response_content) => {
                for (let i = 0; i < response_content["success_msgs"].length; i++) {
                    generateAlert("alert-success", response_content["success_msgs"][i]);
                }
                for (let i = 0; i < response_content["failure_msgs"].length; i++) {
                    generateAlert(null, response_content["failure_msgs"][i]);
                }
            });
        generateAlert("alert-info", `${vars.taskName} sent to ${vars.stations.length} computer(s)`);
    }
}

export default requestAndWait;