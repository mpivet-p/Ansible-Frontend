import generateAlert from './generateAlert.js';

function requestAndWait(endpoint, taskName) {
    //Gathering all selected computers and creating an array with their names
    let selected_elems = document.getElementsByClassName("selected");
    let stations = [];
    for (let i = 0; i < selected_elems.length; i++) {
        stations.push(selected_elems[i].id);
    }

    //POST request to express.JS containing the array and the type of operation requested
    if (stations.length > 0) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: taskName, stations: stations })
        };
        fetch(endpoint, requestOptions)
            .then((response) => {
                return (response.json());
            }).then((response_content) => {
                for (let i = 0; i < response_content["success_msgs"].length; i++) {
                    generateAlert("alert-success", response_content["success_msgs"][i]);
                }
                for (let i = 0; i < response_content["failure_msgs"].length; i++) {
                    generateAlert(null, response_content["failure_msgs"][i]);
                }
            });
    }
}

export default requestAndWait;