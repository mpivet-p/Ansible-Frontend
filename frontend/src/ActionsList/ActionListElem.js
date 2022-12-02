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

    return (
        <div className={"action" + actionStatus(action)} onClick={(e) => {
            window.location.href = `/actions/${action._id}`;
        }}>
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