import React from 'react';
import Selecto from 'react-selecto';
import './Cluster.css';
import ClusterControls from './ClusterControls.js';

function Cluster({ children }) {

    return (
        <div className="container">
            <ClusterControls />
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
                    {children}
                </div>
            </div>
            <div id="notifications-container"></div>
        </div>
    );
}

export default Cluster;
