import React from "react";
import {NavLink} from "react-router-dom";

// RENDERING NAVLINKS FOR ROUTES
const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li> <NavLink to="/dogs"> Dogs </NavLink> </li>
            <li> <NavLink to="/sunsets"> Sunsets </NavLink> </li>
            <li> <NavLink to="/rollercoasters"> Roller Coasters </NavLink> </li>
        </ul>
    </nav>
);

export default Nav;
