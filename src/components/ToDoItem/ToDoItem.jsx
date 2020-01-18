import React, { useState } from 'react';
import { Item, Popup, Button } from 'semantic-ui-react';
import ToDoItemForm from '../TodoItemForm/TodoItemForm';
// import { DateInput } from 'semantic-ui-calendar-react';

const ToDoItem = ({todoItem, deleteItem, markIsComplete, editItem}) => {
    const [itemBeingEdited, setItemBeingEdited] = useState(null);
    
    const updateItem = (item) => {
        editItem({...item, item_id: itemBeingEdited.item_id, is_completed: itemBeingEdited.is_completed});
        setItemBeingEdited(null);
    }

    const handleEdit = (item) => {
        setItemBeingEdited(item);
    }

    const handleDelete = (id) => {
        deleteItem(id);
    };  


    const handleMarkCompletion = (item, value) => {
        markIsComplete(item, value);
    }

    return (
        <>
            {
                itemBeingEdited == null?
                <Item>
                    <Item.Content verticalAlign='middle'>
                        <Item.Description style={{ wordBreak: "break-word" }}>{todoItem.title}</Item.Description>
                        <Item.Extra>
                            <Popup 
                                content='Delete item'
                                trigger={
                                    <Button 
                                        floated='right'
                                        icon="delete" 
                                        onClick={() => handleDelete(todoItem.item_id)}
                                    />
                                }
                            />
                            <Popup 
                                content='Edit item' 
                                trigger={
                                    <Button 
                                        floated='right' 
                                        icon="edit" 
                                        onClick={() => handleEdit(todoItem)}
                                    />
                                }
                            />
                            <Popup 
                                content={'Mark item as ' + (todoItem.is_completed? 'incomplete' : 'complete')} 
                                trigger={
                                    <Button 
                                        floated='right' 
                                        icon={todoItem.is_completed? "undo":"check" } 
                                        onClick={() => handleMarkCompletion(todoItem, todoItem.is_completed? false : true)}
                                    />
                                }
                            />
                            <span floated="left"> Due: {todoItem.due_date.split('T')[0]}</span>
                        </Item.Extra>
                    </Item.Content>
                </Item>
                
                :

                <Item>
                    <Item.Content verticalAlign='middle'>
                        <ToDoItemForm addNewItem={updateItem} initialTitleValue={itemBeingEdited.title} initialDateValue={itemBeingEdited.due_date} />
                    </Item.Content>
                </Item>
            }
        </>
    );
};

export default ToDoItem;