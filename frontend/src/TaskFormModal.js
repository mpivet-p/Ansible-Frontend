import React, { useState } from 'react';
import Modal from './Modal.js';
import requestAndWait from './utils/requestAndWait.js';

function TaskFormModal({ task }) {
    const [isOpen, setIsOpen] = useState(false);
    const [extraVars, setExtraVars] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        requestAndWait(`${process.env.REACT_APP_ADDRESS}${task.route}`, {taskName: task.taskName, extraVars: extraVars});
        setIsOpen(false);
    }

    const handleChange = (event) => {
        extraVars[event.target.name] = event.target.value;
        setExtraVars(extraVars);
    }

    return (
        <div className="btn-modal-container">
            <button className="request-btn" onClick={() => {
                setIsOpen(true);
            }}>{task.displayName}</button>
            <Modal open={isOpen}>
            <div className="modal-form">
                <form onSubmit={handleSubmit}>
                    {task.extraVars.map((elem) => {
                        const [varName, varParams] = Object.entries(elem)[0];
                        if (varParams.inputType === "select") {
                            return (<>
                                <label htmlFor={`${task.taskName}:${varName}`}>{varName}</label>
                                <select type="text" name={varName} id={`${task.taskName}:${varName}`} onChange={handleChange}>
                                    {varParams.options.map((option) => {
                                        const [name, displayName] = Object.entries(option)[0];
                                        return (<option value={name} key={name}>{displayName}</option>);
                                    })}
                                </select><br />
                            </>);
                        } else if (varParams.inputType == "text") {
                            return (<>
                                <label htmlFor={`${task.taskName}:${varName}`}>{varName}</label>
                                <input type="text" name={varName} id={`${task.taskName}:${varName}`}onChange={handleChange}/>  
                                <br />  
                            </>);
                        }
                    })}
                    <div className="form-buttons">
                        <button type="button" className="btn" onClick={() => {setIsOpen(false)}}>Cancel</button>
                        <input type="submit" value="Submit" className="btn" />
                    </div>
                </form>
            </div>
            </Modal>
        </div>
    );
}

export default TaskFormModal;