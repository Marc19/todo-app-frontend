import React from 'react';
import NavBar from '../NavBar/NavBar';
import { Segment } from 'semantic-ui-react';

const MainLayout = ({children, ...rest}) => {  
    return (
        
        <Segment padded>
            <NavBar {...rest}/>
            {children}
        </Segment>
    );
}

export default MainLayout;