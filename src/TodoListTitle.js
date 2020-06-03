import React from 'react';
import {connect} from "react-redux";



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
            const action = {
                type: "DELETE-TODOLIST",
                id: id
            };

            dispatch(action)
        },

    }
}


const ConnectedTodoListTitle = connect(mapStateToProps, mapDispatchToProps)(TodoListTitle);
export default ConnectedTodoListTitle;
