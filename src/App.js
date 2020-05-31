import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";

class App extends React.Component {
    state = {
        todolists: [
            {id: 1, title: 'JS'},
            {id: 2, title: 'Angular'},
            {id: 3, title: 'Redux'},
            {id: 4, title: 'React'},
        ]
    }
    nextTodoId = 0;

    addTodoList = (newTitle) => {
        let newTodo = {
            title: newTitle,
            id: this.nextTodoId
        };
        this.nextTodoId++;
        let newTodos = [...this.state.todolists, newTodo];
        this.setState({todolists: newTodos}, this.saveState);

    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem('todolists', stateAsString)
    }

    restoreState = () => {
        let state = {
            todolists: [],

        };
        let stateAsString = localStorage.getItem('todolists');
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.todolists.forEach(t => {
                if (t.id >= this.nextTodoId) {
                    this.nextTodoId = t.id + 1
                }
            })
        });
    }

    componentDidMount() {
        this.restoreState();
    }

    render = () => {
        const todolists = this.props.todolists.map(t => {
            return <TodoList key={t.id} id={t.id} title={t.title}/>
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
const ConnectedApp = connect(mapStateToProps)(App);
export default ConnectedApp;






