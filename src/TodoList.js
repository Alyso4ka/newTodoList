import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";

class App extends React.Component {


    state = {
        filterValue: "All"
    };

    componentDidMount() {

    }

    addTask = (newText) => {
        this.props.addTask(newText, this.props.id);
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }

    changeTask = (taskId, obj) => {
        this.props.changeTask(taskId, obj);
    }



    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    };

    render = () => {

        return (

            <div className="todoList">
                <div className="todoList-header">

                    <TodoListTitle title={this.props.title}
                    id={this.props.id}
                    />
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                {/*<TodoListHeader addTask={this.addTask} title={this.props.title}/>*/}
                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               todolistId={this.props.id}
                               tasks={this.props.tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.isDone === false;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.isDone === true;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>


        );
    }
}

export default App;



