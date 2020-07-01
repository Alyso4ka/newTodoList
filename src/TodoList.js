import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskAC, addTaskThunkCreator,
    deleteTaskAC, deleteTaskThunkCreator,
    deleteTodolistAC, deleteTodolistThunkCreator,
    loadTasksThunkCreator,
    setTasksAC,
    updateTaskAC, updateTaskThunkCreator,
    updateTodolistTitleAC
} from "./reducer";
import {api} from "./api";

class TodoList extends React.Component {

    state = {
        filterValue: "All"
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.loadTasks(this.props.id)


    };

    addTask = (newText) => {
        this.props.addTask(newText, this.props.id)

    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (taskId, obj) => {
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};

        this.props.updateTask (this.props.id, task, obj)

    };

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    };

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)

    };

    updateTitle = (title) => {
        api.updateTodolistTitle(title, this.props.id)
            .then(res => {
                this.props.updateTodolistTitle(title, this.props.id);
            });
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <div className="wrapper">
                        <TodoListTitle title={this.props.title} updateTitle={this.updateTitle}/>
                        <button onClick={this.deleteTodolist}>X</button>
                    </div>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>

                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasks={tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.status === 0;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.status === 2;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(title, todolistId) {
            let thunk = addTaskThunkCreator(title, todolistId)
            dispatch(thunk);
        },

        updateTask(todolistId, task, delta) {
            const thunk = updateTaskThunkCreator(todolistId, task, delta);
            dispatch(thunk);
        },
        deleteTodolist: (todolistId) => {
            const thunk = deleteTodolistThunkCreator(todolistId);
            dispatch(thunk)
        },
        deleteTask: (todolistId, taskId) => {
            const thunk = deleteTaskThunkCreator(todolistId, taskId);
            dispatch(thunk)
        },
        updateTodolistTitle: (title, todolistId) => {
            const action = updateTodolistTitleAC(todolistId, title);
            dispatch(action)
        },
        loadTasks: (todolistId) => {
            dispatch(loadTasksThunkCreator(todolistId))
        }
    }
};

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodolist;

