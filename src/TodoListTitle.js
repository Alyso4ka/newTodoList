import React from 'react';
import {connect} from "react-redux";
import {DELETE_TODOLIST, deleteTodolistAC} from "./reducer";



class TodoListTitle extends React.Component {
    onDelete = () => {
        {this.props.deleteTodolist(this.props.id)}
    }

    render = () => {


        return <h3 className="todoList-header__title">
            {this.props.title}
            <button onClick={this.onDelete}>x</button>
        </h3>

    };

}


const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodolist: (id) => {
            dispatch(deleteTodolistAC(id))
        },

    }
}


const ConnectedTodoListTitle = connect(mapStateToProps, mapDispatchToProps)(TodoListTitle);
export default ConnectedTodoListTitle;
