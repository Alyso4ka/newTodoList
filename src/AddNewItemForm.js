import React from 'react';
import './App.css';

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ''
    }


    onAddItemClick = () => {
        // let newText = this.newTasksTitileRef.current.value;
        let newText = this.state.title.trim();
        if (newText === '') {
            this.setState({error: true})
        } else {
            // this.newTasksTitileRef.current.value = "";
            this.props.addItem(newText);
            this.setState({
                error: false,
                title: ''
            })
        }
    }

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddTaskClick();
        }
    }


    render = () => {
        let errorClass = this.state.error ? 'error' : '';

        return (
                <div className="todoList-newTaskForm">
                    <input
                        value={this.state.title}
                        onChange={this.onTitleChanged}
                        onKeyPress={this.onKeyPress}
                        className={errorClass}
                        type="text"
                        placeholder="New item name"/>

                    <button onClick={this.onAddItemClick}>Add</button>
                </div>

        );
    }
}

export default AddNewItemForm;

