import React, { useState } from "react"

function HostsList({hosts, minimized}) {
    // const [displayList, setDisplayList] = useState(hosts);
    // const [displayList, setDisplayList] = useState(hosts.slice(0, 4));
    const [displayList, setDisplayList] = useState(minimized ? hosts.slice(0, 4) : hosts);

    const hostsLabel = (host) => {
        let baseClass = "host-label label";
        switch (true) {
            case /^c\dr\d+$/.test(host):
                baseClass += " label-row";
                break;
            case (host === "bocal"):
                baseClass += " label-row";
                break;
            case /^c\d$/.test(host):
                baseClass += " label-cluster";
                break;
        }
        return (
            <React.Fragment key={host}>
                <span className={baseClass} key={host}>
                    {host}
                </span> </React.Fragment>
        );
    }

    const displayMoreHosts = () => {
        return (
            <React.Fragment key={hosts[4]}>
                <span className="label label-fadeout" onClick={() => {
                    setDisplayList(hosts);
                }}>{hosts[4]}</span>
                <span className="label-fadeout-gradient"></span>
            </React.Fragment>
        );
    };

    return (
        <p className="host-list hidden" onClick={(e) => e.stopPropagation()}>
            {displayList.map((host) => hostsLabel(host))}
            {hosts.length > displayList.length ? displayMoreHosts() : <></>}
            
        </p>
    );

}

export default HostsList;

