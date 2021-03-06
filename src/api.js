import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    // меняем API-KEY на собственный
    headers: {"API-KEY": "b06608a6-b289-49e3-a247-1876a702d6e4"}
});

export const api = {
    getTodolists() {
        return instance.get("");
    },
    createTodolist(title) {
        return instance.post("", {title})
    },
    deleteTodolist(todolistId) {
        return instance.delete(`/${todolistId}` )
    },
    updateTodolistTitle(title, todolistId) {
        return instance.put(`/${todolistId}`, {title: title})
    },
    getTasks(todolistId) {
        return instance.get(`/${todolistId}/tasks`)
    },
    createTask(newTaskTitle, todolistId) {
        return instance.post(`/${todolistId}/tasks`, {title: newTaskTitle});
    },

    updateTask(taskId, todolistId, task) {
        return instance.put(`/${todolistId}/tasks/${taskId}`,  task);
    },
    deleteTask(taskId, todolistId) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    }
};




