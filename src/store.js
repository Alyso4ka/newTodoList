import {createStore} from "redux";

const initialState = {
    todolists: [
        {
            id: 1, title: "JS", tasks: [
                {id: 0, title: 'css'},
                {id: 1, title: 'css'}]
        },
        {id: 2, title: "GraphQL", tasks: []},
        {id: 3, title: "Redux", tasks: []},
        {id: 4, title: "TypeScript", tasks: []}

    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_TODOLIST':
            return {...state, todolists: [...state.todolists, action.newTodolist]}
        case  'ADD_TASK':
            return {...state, todolists: state.todolists.map(todo => {
if (todo.id !== action.todolistId) {
    return todo
} else {
    return {...todo, tasks: [...todo.tasks, action.newTask]}
}
                })}
        default:
            return state;
    }

}


const store = createStore(reducer);
export default store;