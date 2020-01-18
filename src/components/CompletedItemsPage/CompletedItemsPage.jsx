import React from 'react';

import ToDoList from '../ToDoList/ToDoList';

const CompletedItemsPage = ({items, isLoading, deleteItem, markIsComplete, editItem}) => {
    return (        
        <ToDoList isLoading={isLoading} items={items} deleteItem={deleteItem} markIsComplete={markIsComplete} editItem={editItem}/>
    );
}

export default CompletedItemsPage;