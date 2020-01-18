import React, { useState } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

const ToDoItemForm = ({addNewItem, initialTitleValue, initialDateValue}) => {
    const [titleValue, setTitleValue] = useState(initialTitleValue? initialTitleValue : '');
    const [date, setDate] = useState(initialDateValue? initialDateValue.split('T')[0] : '');

    const handleDateChange = (_, {value}) => {
        setDate(value);
    }

    const handleAdd = () => {
        if(titleValue.length > 0 && titleValue.length < 280 && date.length > 0){
            const item = {
                title: titleValue,
                due_date: date
            };
            addNewItem(item);
            setTitleValue('');
            setDate('');
        }
    }

    return (
        <Grid columns='3'>
                <Grid.Column width={12}>
                    <Input 
                        fluid
                        placeholder='Add new item to do. Length must be less than 280 characters.' 
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}    
                    />
                </Grid.Column>

                <Grid.Column width={3}>
                    <DateInput
                        fluid
                        name="date"
                        placeholder="Due Date"
                        value={date}
                        dateFormat="YYYY-MM-DD"
                        iconPosition="left"
                        minDate={new Date()}
                        popupPosition="bottom center"
                        onChange={handleDateChange}
                    />
                </Grid.Column>

                <Grid.Column width={1}>
                    <Button fluid icon={initialTitleValue && initialDateValue? 'pencil alternate':'add'} color='black' onClick={handleAdd}/>
                </Grid.Column>
            </Grid>
    );
}

export default ToDoItemForm;