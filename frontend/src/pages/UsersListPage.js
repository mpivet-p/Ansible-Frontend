import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/UsersListPage.css';

function UsersListPage() {
    const [users, setUsers] = useState([]);
    const roles = ["admin", "staff", "guest"];

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ADDRESS}/users`, {headers: {"x-access-token": localStorage.getItem("token")}})
        .then(response => {
            const data =  response.data;
            setUsers(data);
        })
        .catch(err => {
            if (err.response.status) {
                document.getElementsByClassName("users-list")[0].innerHTML = '<p>Error</p>';
            }
            console.log(err);
        });
    }, [])

    const role_change = (event, email) => {
        axios.post(`${process.env.REACT_APP_ADDRESS}/update`, {email: email, kind: event.target.value}, {headers: {"x-access-token": localStorage.getItem("token")}})
        .then(response => {
        })
        .catch(err => {
            if (err.response.status >= 400 && err.response.status < 500) {
                console.log(err.response.data);
            }
        });
    };

    const role_selector = (current, email) => {
        return (
        <select type="text" name="role" id="role-choice" defaultValue={current} onChange={event => role_change(event, email)}>
            {roles.map((role) => {
                return (<option key={role} value={role}>{role}</option>)
            })}
        </select>)
    };

    return (
        <div className="users-list">
            <table>
                <tbody>
                {users.map((user) => {
                    return (
                    <tr key={user.email}>
                        <td>{user.email}</td>
                        <td>{role_selector(user.kind, user.email)}</td>
                        <td><button className="request-btn" onClick={() => {window.location = `/changepassword/${user.email}`}}>Change password</button></td>
                        <td><button className="request-btn" >Delete</button></td>
                    </tr>);
                })}
                </tbody>
            </table>
        </div>
    );
}

export default UsersListPage;
