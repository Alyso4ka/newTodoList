import {createStore} from "redux";

const initialState = {
    todolists: [
        {'id': 0, 'title': 'every day'},
        {'id': 1, 'title': 'tomorrow'},
        {'id': 2, 'title': 'next week'}

    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return {
                ...state,
                todolists: [action.newTodolist, ...state.todolists]

            }
            return state;

    }



    return state;
}

const store = createStore(reducer);
export default store;

