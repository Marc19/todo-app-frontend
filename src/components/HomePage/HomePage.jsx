import React from 'react';

import ToDoItemForm from '../TodoItemForm/TodoItemForm';
import ToDoList from '../ToDoList/ToDoList';

const HomePage = ({items, isLoading, addNewItem, deleteItem, markIsComplete, editItem}) => {
    return (
        <>
            <ToDoItemForm addNewItem={addNewItem}/>

            <ToDoList isLoading={isLoading} items={items} deleteItem={deleteItem} markIsComplete={markIsComplete} editItem={editItem}/>
        </>
    );
};

export default HomePage;