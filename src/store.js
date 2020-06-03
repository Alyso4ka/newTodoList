import {createStore} from "redux";

const initialState = {
    todolists: [
        {'id': 0, 'title': 'every day', tasks: [
            {"title":"breakfast","isDone":false,"priority":"low","id":0},
                {"title":"dinner","isDone":false,"priority":"low","id":1}
                ]
        },
        {'id': 1, 'title': 'tomorrow', tasks: [
                {"title":"sport","isDone":false,"priority":"low","id":0},
                {"title":"reading","isDone":false,"priority":"low","id":1}
            ]
        },

    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            let newTodoList = {
                id: (new Date()).getTime(),
                title: action.newTitle,
                tasks: []
            }
            return {
                ...state,
                todolists: [newTodoList, ...state.todolists]
            }
        case 'ADD-TASK':
            return {
                ...state,
                todolists: state.todolists.map( t => {
                    if (action.todolistId == t.id) {
                        return {
                            ...t,
                            tasks: [action.newTask, ...t.tasks]
                        }
                    } else {
                        return t;
                    }
                })

            }

            return state;

    }



    return state;
}

const store = createStore(reducer);
export default store;

