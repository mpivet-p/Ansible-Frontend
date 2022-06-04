import React from 'react';
import Selecto from 'react-selecto';
import './Cluster.css';
import ClusterMap from './c1.js';
import RequestButton from './RequestButton';
import OpendayModal from './OpendayModal.js';
import BackgroundModal from './BackgroundModal.js';

function Cluster({ clusterId }) {
    // let { clusterId } = useParams();

    return (
        <div className="container">
            <div className="cluster-controls">
                <RequestButton buttonText="Reboot" endpoint="/api/reboot" vars={{taskName: "reboot"}} />
                <RequestButton buttonText="Ping" endpoint="/api/ping" vars={{taskName: "ping"}} />
                <BackgroundModal buttonText="Change Backgrounds" />
                <OpendayModal buttonText="Start Openday" />
            </div>
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
            <div id="notifications-container"></div>
        </div>
    );
}

export default Cluster;