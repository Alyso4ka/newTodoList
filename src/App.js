import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TASK, ADD_TODOLIST, CHANGE_TASK, DELETE_TODOLIST} from "./reducer";

class App extends React.Component {

    addTodoList = (newTitle) => {
        this.props.addTodolist(newTitle);
    }

    componentDidMount() {
        // this.restoreState();
    }

    render = () => {
        const todolists = this.props
            .todolists
            .map(t => {
            return <TodoList
                key={t.id}
                id={t.id}
                title={t.title}
                tasks={t.tasks}
                addTask={this.props.addTask}
                changeTask={this.props.changeTask}
            />
        })
        return (
            <>

                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>

                </div>
                <div className='App'>

                    {todolists}
                    {/*<TodoList id={1}/>*/}
                    {/*<TodoList id={2}/>*/}
                </div>
            </>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        todolists: state.todolists

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTitle) => {
            const action = {
                type: ADD_TODOLIST,
                newTitle: newTitle
            };

            dispatch(action)
        },


        addTask: (newTitle, todolistId) => {
            const action = {
                type: ADD_TASK,
                newText: newTitle,
                todolistId: todolistId

            };

            dispatch(action)
        },
        changeTask: (taskId, obj) => {
            const action = {
                type: CHANGE_TASK,
                taskId: taskId,
                delta: obj
            };
            dispatch(action)

        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;






