import React from "react";
import './styles/navbar.css'

function Navbar() {
    const logoutHandler = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/login";
    };
    if (!(localStorage.getItem("token"))) {
        return;
    }

    return (
        <ul>
            <li><a href="/cluster/1">Cluster 1</a></li>
            <li><a href="/cluster/2">Cluster 2</a></li>
            <li><a href="/cluster/3">Cluster 3</a></li>
            <li><a href="/cluster/bocal">Bocal</a></li>
            <li className="navbar-right"><a href="#" onClick={logoutHandler}>logout</a></li>
            <li className="navbar-right"><a href="/changepassword">Change Password</a></li>
            <li className="navbar-right"><a href="/admin/users">Users</a></li>
        </ul>
    );
}

export default Navbar;