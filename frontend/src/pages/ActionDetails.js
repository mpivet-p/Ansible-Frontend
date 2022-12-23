import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import HostsList from "../ActionsList/HostsList";
import PrettyPrintJson from "../ActionsList/PrettyPrintJson";
import '../styles/ActionDetails.css';

function ActionDetails() {
    const [action, setAction] = useState();
    let { action_id } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ADDRESS}/actions/${action_id}`, {headers: {"x-access-token": localStorage.getItem("token")}})
        .then(response => {
            setAction(response.data[0]);
        })
        .catch(err => {
            if (err.response.status) {
                if (err.response.status == 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
                document.getElementsByClassName("users-list")[0].innerHTML = '<p>Error</p>';
            }
            console.log(err);
        });
    }, []);

    if (action) {
        return (
            <div className="action-detail">
                <p>Task: {action.task}</p>
                <p>Author: {action.from}</p>
                <p>Started at: {action.created_at}</p>
                <p>Completed at: {action.done_at}</p>
                <div className="hosts-success">
                    <p>Task successfully completed:</p>
                    <HostsList hosts={action.hosts_successful} minimized={false} />
                </div>
                <div className="hosts-failed">
                    <p>Task failed:</p>
                    <HostsList hosts={action.hosts_failed} minimized={false} />
                </div>
                <div className="command-json">
                    <PrettyPrintJson data={{"command": action.command, "output" : action.result}}/>
                </div>
            </div>
        );
    }
}

export default ActionDetails;