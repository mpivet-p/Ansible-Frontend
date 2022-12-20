import React from "react";
import HostsList from "./HostsList";
import group_by_row from "../utils/group_by_row";

function ActionListElem({action}) {
    const date = new Date(action.created_at)
    var hosts = group_by_row(action.hosts).sort((a, b) => a.length - b.length);

    const actionStatus = (action) => {  
        if (action.hosts.length === action.hosts_successful.length) {
            return (" action-success");
        } else if (action.hosts.length === action.hosts_failed.length) {
            return (" action-failed");
        } else {
            return (" action-errors")
        }
    };

    const green_part = action.hosts_successful.length / action.hosts.length * 100;
    const orange_part = 100 - green_part;
    return (
        <div className={"action" + actionStatus(action)} onClick={(e) => {
            window.location.href = `/actions/${action._id}`;
        }} style={{borderImage: `linear-gradient(90deg, var(--success-color) ${green_part}%, var(--failed-color) 0%, var(--failed-color) 100%) 1`}}>
            <HostsList hosts={hosts} minimized={true} />
            <p>
                <span className="action-date">
                    {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                </span>
            </p><br />
            <p>{action.task}</p>
        </div>
    )
}

export default ActionListElem;