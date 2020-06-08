import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, addTodolistAC, changeTaskAC, } from "./reducer";

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
        addTodolist: (newTodolist) => {
            dispatch(addTodolistAC(newTodolist))
        },


        addTask: (newTitle, todolistId) => {
            dispatch(addTaskAC(newTitle, todolistId))
        },
        changeTask: (taskId, obj) => {
            dispatch(changeTaskAC(taskId, obj))

        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;






