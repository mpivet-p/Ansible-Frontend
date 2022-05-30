import React from 'react';

function RequestButton({ buttonText, endpoint, taskName }) {

    return (
        <button className="request-btn" onClick={() => {
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
                    }).then((myJson) => {
                        console.log(myJson);
                    });
            }

        }}>{buttonText}</button>
    );
}

export default RequestButton;