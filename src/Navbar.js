import React from "react";
import './navbar.css'

function Navbar() {
    return (
        <ul>
            <li><a href="/">Home</a></li>
            <li className="navbar-spacer"></li>
            <li><a href="/cluster/1">Cluster 1</a></li>
            <li><a href="/cluster/2">Cluster 2</a></li>
            <li><a href="/cluster/3">Cluster 3</a></li>
            <li><a href="/auth">Login</a></li>
        </ul>
    );
}

export default Navbar;