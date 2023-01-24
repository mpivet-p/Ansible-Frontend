import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BackgroundModal from '../Background/BackgroundModal.js';
import UploadBackgroundModal from '../Background/UploadBackgroundModal.js';
import RequestButton from '../RequestButton.js';
import TaskFormModal from '../TaskFormModal.js';

function ClusterControls() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        await axios.get(`${process.env.REACT_APP_ADDRESS}/api/task-list`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then(response => {
            setTasks(response.data);
        }).catch (e => {
            if (e.response.status === 401) {
                window.location.href = '/login'
            }
            console.log(e);
        });
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="cluster-controls">
            <BackgroundModal buttonText="Change Backgrounds" />
            <UploadBackgroundModal buttonText="Upload Background" />
            {tasks.map((task) => {
                if (!task.extraVars) {
                    return (
                        <RequestButton buttonText={task.displayName} endpoint={`${process.env.REACT_APP_ADDRESS}${task.route}`} vars={{taskName: task.taskName}} key={task.taskName}/>
                    );
                }
                return (
                   <TaskFormModal task={task} key={task.taskName}/>
                );
            })}
        </div>
    );
}

export default ClusterControls;
