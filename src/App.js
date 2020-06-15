import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import axios from 'axios';
import {addTaskAC, addTodolistAC, changeTaskAC, setTodolistsAC,} from "./reducer";

class App extends React.Component {

    addTodoList = (newTitle) => {
        this.props.addTodolist(newTitle);
    }

    componentDidMount() {
        // запрос на сервак
        // const todolists = [
        //     {
        //         'id': 0, 'title': 'every day', tasks: [
        //             {"title": "breakfast", "isDone": false, "priority": "low", "id": 0},
        //             {"title": "dinner", "isDone": false, "priority": "low", "id": 1}
        //         ]
        //     },
        //     {
        //         'id': 1, 'title': 'tomorrow', tasks: [
        //             {"title": "sport", "isDone": false, "priority": "low", "id": 2},
        //             {"title": "reading", "isDone": false, "priority": "low", "id": 3}
        //         ]
        //     },
        //
        // ]

        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {withCredentials: true})
            .then(res => {
                debugger
                console.log(res.data);
                this.props.setTodolists(res.data)
            });


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
        setTodolists: (todolists) => {
            const action = setTodolistsAC(todolists)
            dispatch(action)
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






