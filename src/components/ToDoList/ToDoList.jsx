import React from 'react';
import { Item, Container, Message, Segment } from 'semantic-ui-react'

import ToDoItem from '../ToDoItem/ToDoItem';

const ToDoList = ({isLoading, items, ...rest}) => {

    return (
        <>
            {
                (!items || items.length === 0)?
                    <Container textAlign="center" style={{ marginTop: "1rem" }}>
                        <Message>
                            <Message.Header>
                                {"Nothing to do is itself a great doing."} 
                            </Message.Header>
                        </Message>
                    </Container>
                :
                <Segment loading={isLoading}>
                    <Item.Group divided unstackable>
                    {
                        items.map(item => 
                            <ToDoItem key={item.item_id} todoItem={item} {...rest}/>
                            )
                        }
                    </Item.Group>
                </Segment>
            }  
        </>  
    );
};

export default ToDoList;