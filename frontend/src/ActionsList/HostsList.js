import React, { useState } from "react"

function HostsList({hosts}) {
    const [displayList, setDisplayList] = useState(hosts.slice(0, 4));

    const hostsLabel = (host) => {
        return (
            <React.Fragment key={host}>
                <span className="host-label label" key={host}>
                    {host}
                </span> </React.Fragment>
        );
    }

    const displayMoreHosts = () => {
        return (
            <React.Fragment key={hosts[4]}>
                <span className="label label-fadeout" onClick={(e) => {
                    setDisplayList(hosts);
                    e.stopPropagation();
                }}>{hosts[4]}</span>
                <span className="label-fadeout-gradient"></span>
            </React.Fragment>
        );
    };

    return (
        <p className="host-list hidden">
            {displayList.map((host) => hostsLabel(host))}
            {hosts.length > displayList.length ? displayMoreHosts() : <></>}
            
        </p>
    );

}

export default HostsList;

