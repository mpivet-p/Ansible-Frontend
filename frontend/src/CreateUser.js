import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
    const [user, setUser] = useState({});
    const roles = ["admin", "staff", "guest"];

    const handleChange = (event) => {
        user[event.target.name] = event.target.value;
        setUser(user);
    }

    const sendRequest = () => {
        axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");
        axios.post(`${process.env.REACT_APP_ADDRESS}/register`, user)
        .then(response => {
            // window.location.href = "/admin/users";
        })
        .catch(err => {
            if (err.response.status) {
                if (err.response.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
            }
            console.log(err);
        });
    };

    return (
        <tr className="new-user-form">
            <td><input type="text" name="email" placeholder="Username" onChange={handleChange}/></td>
            <td>
                <select type="text" name="kind" id="kind-choice" defaultValue={roles.at(-1)} onChange={handleChange}>
                    {roles.map((role) => {
                        return (<option key={role} value={role}>{role}</option>)
                    })}
                </select></td>
            <td><input type="password" name="password" onChange={handleChange} placeholder="Password"/></td>
            <td><button className="request-btn" onClick={sendRequest} >Create User</button></td>
        </tr>
    );
}

export default CreateUser;