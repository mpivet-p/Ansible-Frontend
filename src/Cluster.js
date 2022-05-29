import React from 'react';
// import { useParams } from 'react-router';
import Selecto from 'react-selecto';
import './Cluster.css';
import ClusterMap from './c1.js';

function Cluster({ clusterId }) {
    // let { clusterId } = useParams();

    return (
        <div className="container">

            <button onClick={() => {
                //Gathering all selected computers and creating an array with their names
                let selected_elems = document.getElementsByClassName("selected");
                let stations = [];
                for (let i = 0; i < selected_elems.length; i++) {
                    stations.push(selected_elems[i].id);
                }

                //POST request to express.JS containing the array and the type of operation requested
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task: "reboot", stations: stations })
                };
                fetch('/api/reboot', requestOptions)
                    .then(response => response.json());
            }}>Reboot</button>

            <div className="cluster-map">
                <Selecto
                    dragContainer={".elements"}
                    selectableTargets={[".selecto-area .station"]}
                    hitRate={0}
                    selectByClick={true}
                    selectFromInside={true}
                    toggleContinueSelect={["shift"]}
                    ratio={0}
                    onSelect={e => {
                        e.added.forEach(el => {
                            el.classList.add("selected");
                        });
                        e.removed.forEach(el => {
                            el.classList.remove("selected");
                        });
                    }}
                ></Selecto>

                <div className="elements selecto-area" id="selecto1">
                    <ClusterMap />
                </div>
            </div>
        </div>
    );
}

export default Cluster;