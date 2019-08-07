import React from 'react';

import {
    NavLink
} from 'react-router-dom';

const Nav =(props) => (
    <nav className='main-nav'>
      <ul>
        <li>
           <NavLink exact to ='/buttonA'>{props.buttonText[0]}</Navlink>
        </li>
        <li>
           <NavLink exact to ='/buttonB'>{props.buttonText[1]}</Navlink>
        </li>
        <li>
           <NavLink exact to ='/buttonC'>{props.buttonText[2]}</Navlink>
        </li>
      </ul>
    </nav>
);

export default Nav;