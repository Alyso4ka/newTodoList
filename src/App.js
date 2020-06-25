import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC, setTodolistsAC} from "./reducer";
import {api} from "./api";

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        api.getTodolists().then(res => {
            this.props.setTodolists(res.data);
        });
    };

    addTodoList = (title) => {
        api.createTodolist(title)
            .then(res => {
                let todolist = res.data.data.item;
                this.props.addTodolist(todolist);
            });
    };

    render = () => {
        const todolists = this.props.todolists.map(tl => {
            return <TodoList key={tl.id}
                             id={tl.id}
                             title={tl.title}
                             tasks={tl.tasks}/>
        });

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTodolists: (todolists) => {
            const action = setTodolistsAC(todolists);
            dispatch(action)
        },
        addTodolist: (newTodolist) => {
            const action = addTodolistAC(newTodolist);
            dispatch(action)
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
