import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";
import {connect} from "react-redux";

class TodoListTasks extends React.Component {
    render = () => {

        let tasksElements = this.props.tasks.map(task => <TodoListTask
            task={task}
            changeStatus={this.props.changeStatus}
            changeTitle={this.props.changeTitle}
            key={task.id}
            deleteTask={this.props.deleteTask}
            todolistId={this.props.todolistId}
        />);

        return (

            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (taskId, todolistId) => {
            const action = {
                type: "DELETE-TASK",
                taskId: taskId,
                todolistId: todolistId
            };
            dispatch(action)
        },

    }
}


const ConnectedTodoListTasks = connect(mapStateToProps, mapDispatchToProps)(TodoListTasks);
export default ConnectedTodoListTasks;


