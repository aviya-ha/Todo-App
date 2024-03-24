import { todoService } from "../../service/todo.service.js";
import {SET_TODOS,REMOVE_TODO,ADD_TODO,UPDATE_TODO,INCREMENT,DECREMENT, store } from "../store.js";

export function loadTodo(filterBy) {
    return todoService.query(filterBy)
    .then(todos => {
        console.log('todos:', todos)
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function checkTodo(todo){
    // DECREMENT  INCREMENT
    (todo.isDone)?  todo.isDone = false : todo.isDone = true
    const type = todo.isDone ? INCREMENT : DECREMENT
    return todoService.save(todo)
    .then(savedTodo => {
        store.dispatch({ type, todo: savedTodo })
        console.log('savedTodo:', savedTodo)
        return savedTodo
    })
    .catch(err => {
        console.log('todo action -> Cannot save todo', err)
        throw err
    })   
}