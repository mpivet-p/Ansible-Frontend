import React from "react";
import HostsList from "./HostsList";
import group_by_row from "../utils/group_by_row";

function ActionListElem({action}) {
    const date = new Date(action.created_at)

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
            console.log(e.target);
            console.log(e.currentTarget);
        }}>
            <HostsList hosts={group_by_row(action.hosts)} />
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