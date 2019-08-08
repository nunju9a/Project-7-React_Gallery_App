import React from "react";
import {NavLink} from "react-router-dom";

// RENDERING NAVLINKS FOR ROUTES
const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li> <NavLink to="/button1"> Puppies </NavLink> </li>
            <li> <NavLink to="/button2"> Sunsets </NavLink> </li>
            <li> <NavLink to="/button3"> Roller Coasters </NavLink> </li>
        </ul>
    </nav>
);

export default Nav;
