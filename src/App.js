import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC, setTodolistsAC, getTodolistsTC, createTodolistTC} from "./reducer";
import {api} from "./api";

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.getTodolists()


        //
        // api.getTodolists().then(res => {
        //     this.props.setTodolists(res.data);
        // });
    };

    addTodoList = (title) => {
        this.props.createTodolist(title);
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

        addTodolist: (newTodolist) => {
            const action = addTodolistAC(newTodolist);
            dispatch(action)
        },
        getTodolists: () => {
            dispatch(getTodolistsTC())
        },

        createTodolist: (title) => {
            dispatch(createTodolistTC(title))
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
