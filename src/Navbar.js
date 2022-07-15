import React from "react";
import './navbar.css'

function Navbar() {
    return (
        <ul>
            <li><a href="/cluster/1">Cluster 1</a></li>
            <li><a href="/cluster/2">Cluster 2</a></li>
            <li><a href="/cluster/3">Cluster 3</a></li>
            <li><a href="/cluster/bocal">Bocal</a></li>
        </ul>
    );
}

export default Navbar;