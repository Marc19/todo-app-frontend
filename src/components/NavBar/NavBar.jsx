import React from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
    return (
        <Menu inverted>
          <Menu.Item
            name='Home'
            active={props.isHomeActive}
            as={Link} to='/'
          >
          Home
          </Menu.Item>
  
          <Menu.Item
            name='Completed items'
            active={props.isCompletedActive}
            as={Link} to='/completed'
          >
          Completed items
          </Menu.Item>
        </Menu>
      )
}

export default NavBar;