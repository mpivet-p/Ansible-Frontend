import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HostsList from "../ActionsList/HostsList";
import PrettyPrintJson from "../ActionsList/PrettyPrintJson";
import '../styles/ActionDetails.css';

function ActionDetails() {
    const [action, setAction] = useState();
    let { action_id } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ADDRESS}/api/actions/${action_id}`, {headers: {"x-access-token": localStorage.getItem("token")}})
        .then(response => {
            setAction(response.data[0]);
        })
        .catch(err => {
            if (err.response.status) {
                if (err.response.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
                document.getElementsByClassName("users-list")[0].innerHTML = '<p>Error</p>';
            }
            console.log(err);
        });
    }, [action_id]);

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.code === 'Escape') {
            console.log("Escape");
            window.history.go(-1);
          }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
      }, []);

    if (action) {
        const date_creat = new Date(action.created_at);
        const date_done = new Date(action.done_at);
        return (
            <div className="container-action-detail">
                <div className="action-detail">
                    <p>Task: {action.task}</p>
                    <p>Author: {action.from}</p>
                    <p>Started at: {date_creat.toLocaleDateString()} {date_creat.toLocaleTimeString()}</p>
                    <p>Completed at: {date_done.toLocaleDateString()} {date_done.toLocaleTimeString()}</p>
                    <div className="hosts-success">
                        <p>Success:</p>
                        <HostsList hosts={action.hosts_successful} minimized={false} />
                    </div>
                    <div className="hosts-failed">
                        <p>Failed:</p>
                        <HostsList hosts={action.hosts_failed} minimized={false} />
                    </div>
                    <div className="hosts-unreachable">
                        <p>Unreachable:</p>
                        <HostsList hosts={action.hosts_unreachable} minimized={false} />
                    </div>
                    <p>Output:</p>
                    <div className="command-json">
                        <PrettyPrintJson data={{"command": action.command, "output" : JSON.parse(action.result)}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ActionDetails;
