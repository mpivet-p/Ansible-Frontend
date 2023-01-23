import React from "react";
import HostsList from "./HostsList";
import group_by_row from "../utils/group_by_row";

function ActionListElem({action}) {
    const date = new Date(action.created_at)
    var hosts = group_by_row(action.hosts).sort((a, b) => a.length - b.length);

    const success = action.hosts_successful.length / action.hosts.length * 100;
    const unreachable = success + action.hosts_unreachable.length / action.hosts.length * 100;
    return (
        <div className="action" onClick={(e) => {
            window.location.href = `/actions/${action._id}`;
        }} style={{borderImage: `linear-gradient(90deg, var(--success-color) ${success}%, var(--unreachable-color) 0%, var(--unreachable-color) ${unreachable}%, var(--failed-color) 0%, var(--failed-color) 100%) 1`}}>
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