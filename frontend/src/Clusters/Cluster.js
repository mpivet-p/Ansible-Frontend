import React from 'react';
import Selecto from 'react-selecto';
import './Cluster.css';
import RequestButton from '../RequestButton';
import OpendayModal from '../Openday/OpendayModal.js';
import BackgroundModal from '../Background/BackgroundModal.js';
import UploadBackgroundModal from '../UploadBackground/UploadBackgroundModal.js';
import OpenLinkModal from '../OpenLink/OpenLinkModal.js';

function Cluster({ children }) {

    return (
        <div className="container">
            <div className="cluster-controls">
                <RequestButton buttonText="Reboot" endpoint={`${process.env.REACT_APP_ADDRESS}/api/reboot`} vars={{taskName: "reboot"}} />
                <RequestButton buttonText="Ping" endpoint={`${process.env.REACT_APP_ADDRESS}/api/ping`} vars={{taskName: "ping"}} />
                <BackgroundModal buttonText="Change Backgrounds" />
                <OpendayModal buttonText="Start Openday" />
                <OpenLinkModal buttonText="Open Link" />
                <UploadBackgroundModal buttonText="Upload Background" />
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
                    {children}
                </div>
            </div>
            <div id="notifications-container"></div>
        </div>
    );
}

export default Cluster;
