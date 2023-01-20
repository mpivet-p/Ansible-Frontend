import React, { useEffect } from "react";
import './styles/navbar.css'

function Navbar() {

    useEffect(() => {
        const elements = document.querySelectorAll(`a[href='${document.location.pathname}']`);
        elements.forEach(elem => {
            elem.style.textDecoration = "underline";
            elem.style.textShadow = "0px 2px 15px rgba(0,0,0,0.5)";
        });
    }, []);

    const logoutHandler = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    if (!(localStorage.getItem("token"))) {
        return;
    }

    return (
        <ul id="navbar-list">
            <li><a href="/cluster/1">Cluster 1</a></li>
            <li><a href="/cluster/2">Cluster 2</a></li>
            <li><a href="/cluster/3">Cluster 3</a></li>
            <li><a href="/cluster/bocal">Bocal</a></li>
            <li className="navbar-right"><a href="/login" onClick={logoutHandler}>logout</a></li>
            <li className="navbar-right"><a href="/changepassword">Change Password</a></li>
            <li className="navbar-right"><a href="/admin/users">Users</a></li>
            <li className="navbar-right"><a href="/actions">Actions</a></li>
        </ul>
    );
}

export default Navbar;