import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

    state = {
        error: false,
        title: ''
    }


    onAddTaskClick = () => {
        // let newText = this.newTasksTitileRef.current.value;
        let newText = this.state.title.trim();
        if (newText === '') {
            this.setState({error: true})
        } else {
            // this.newTasksTitileRef.current.value = "";
            this.props.addTask(newText);
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
            <div className="todoList-header">
                <h3 className="todoList-header__title">{this.props.title}</h3>
                <div className="todoList-newTaskForm">
                    <input
                        value={this.state.title}
                        onChange={this.onTitleChanged}
                        onKeyPress={this.onKeyPress}
                        className={errorClass}
                        type="text"
                        placeholder="New task name"/>

                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;
