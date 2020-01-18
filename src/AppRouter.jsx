import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import MainLayout from './components/MainLayout/MainLayout';
import HomePage from './components/HomePage/HomePage';
import CompletedItemsPage from './components/CompletedItemsPage/CompletedItemsPage';
import NotFound from './components/NotFound/NotFound';

const BASE_URL = 'http://localhost:2750';

const AppRouter = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const completedItems = todoItems.filter(item => item.is_completed).sort((a,b) => new Date(b.due_date) - new Date(a.due_date));
  const incompletedItems = todoItems.filter(item => !item.is_completed).sort((a,b) => new Date(a.due_date) - new Date(b.due_date));

  useEffect( () => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `${BASE_URL}/api/todoItem`,
        );
        setLoading(false);
        setTodoItems(result.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const addNewItem = async (item) => {
    try {
      setLoading(true);
      const result = await axios({
        method: 'post',
        url: `${BASE_URL}/api/todoItem`,
        data: {
          title: item.title,
          dueDate: item.due_date
        }
      });
      if(result.status === 201){
        setTodoItems([...todoItems, result.data]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);    
    }
  };

  const editItem = async (item) => {
    try {
      setLoading(true);
      const result = await axios({
        method: 'put',
        url: `${BASE_URL}/api/todoItem/${item.item_id}`,
        data: {
          title: item.title,
          dueDate: item.due_date.split('T')[0],
          isCompleted: item.is_completed
        }
      });

      if(result.status === 200){
        setTodoItems(todoItems.map(i => i.item_id === item.item_id? item : {...i}));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);    
    }
  }

  const markIsComplete = async (item, value) => {
    try {
      setLoading(true);
      const result = await axios({
        method: 'put',
        url: `${BASE_URL}/api/todoItem/${item.item_id}`,
        data: {
          title: item.title,
          dueDate: item.due_date.split('T')[0],
          isCompleted: value
        }
      });

      if(result.status === 200){
        setTodoItems(todoItems.map(i => i.item_id === item.item_id? {...i, is_completed: value} : {...i}));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);    
    }
  }

  const deleteItem = async (id) => {
    try {
      setLoading(true);
      const result = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/todoItem/${id}`
      });

      if(result.status === 200){
        setTodoItems(todoItems.filter(item => item.item_id !== id));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);    
    }
  }

  return (
      <BrowserRouter>
          <React.Fragment>
            {
              <Switch>
                <Route path="/" exact
                      render={() => <MainLayout isHomeActive={true}>
                                      <HomePage 
                                        items={incompletedItems} 
                                        isLoading={isLoading}
                                        addNewItem={addNewItem}
                                        deleteItem={deleteItem}
                                        markIsComplete={markIsComplete}
                                        editItem={editItem}
                                      />
                                    </MainLayout>}/>

                <Route path="/completed"
                      render={() => <MainLayout isCompletedActive={true}>
                                      <CompletedItemsPage 
                                        items={completedItems}
                                        isLoading={isLoading}
                                        deleteItem={deleteItem}
                                        markIsComplete={markIsComplete}
                                        editItem={editItem}
                                      />
                                    </MainLayout>}/>


                <Route render={() => <MainLayout>
                                      <NotFound/>
                                    </MainLayout>}/>                                                     
              </Switch>
            }
          </React.Fragment>
        </BrowserRouter>
    );
}

export default AppRouter;
