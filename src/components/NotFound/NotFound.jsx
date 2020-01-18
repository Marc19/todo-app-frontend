import React from 'react';
import { Container, Message } from 'semantic-ui-react'

const NotFound = () => {
    return(
        <Container textAlign="center">
            <Message negative>
                <Message.Header>
                    {"The Page you're trying to get was not found!"}
                </Message.Header>
            </Message>
        </Container>
    );
};

export default NotFound;