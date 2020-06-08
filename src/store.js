import {createStore} from "redux";

const initialState = {
    todolists: [
        {
            'id': 0, 'title': 'every day', tasks: [
                {"title": "breakfast", "isDone": false, "priority": "low", "id": 0},
                {"title": "dinner", "isDone": false, "priority": "low", "id": 1}
            ]
        },
        {
            'id': 1, 'title': 'tomorrow', tasks: [
                {"title": "sport", "isDone": false, "priority": "low", "id": 2},
                {"title": "reading", "isDone": false, "priority": "low", "id": 3}
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

            let newTask = {
                title: action.newText,
                isDone: false,
                priority: "low",
                id: (new Date()).getTime(),
            };

            return {
                ...state,
                todolists: state.todolists.map(t => {
                    if (action.todolistId == t.id) {
                        return {
                            ...t,
                            tasks: [newTask, ...t.tasks]
                        }
                    } else {
                        return t;
                    }
                })

            }

            return state;
        case 'CHANGE-TASK':

            return {
                ...state,
                todolists: state.todolists.map(t => {
                    let task = t.tasks.find(t => t.id == action.taskId)
                    if (task == null) return t
                    else {
                        return {
                            ...t,
                            tasks: t.tasks.map(t => {
                                if (t.id != action.taskId) return t;
                                else return {
                                    ...t,
                                    ...action.delta
                                }
                            })

                        }
                    }

                })
            }
        case 'DELETE-TODOLIST':
            return {
                ...state,
                todolists: state.todolists.filter(t => t.id != action.id)
            }
        case 'DELETE-TASK':
            return {
                ...state,
                todolists: state.todolists.map(t => {
                    if (t.id != action.todolistId) return t;
                    else return {
                        ...t,
                        tasks: t.tasks.filter (t => t.id != action.taskId)
                    }
                })
            }
    }


    return state;
}

const store = createStore(reducer);
export default store;
