import { userService } from "../service/user.service.js"

const { createStore, compose } = Redux

export const SET_FILTER_BY = 'SET_FILTER_BY'

export const LOADING_IS_SHOWN = 'LOADING_IS_SHOWN'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
//* Todo
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const IS_CHECKED_TODO = 'IS_CHECKED_TODO'

export const SET_USER = 'SET_USER'

const initialState = {
    todos: [],
    checkedTodosCount: 0,
    isLoadingShow: false,
    loggedInUser: userService.getLoggedinUser(),
    filterBy: { txt: '', isDone: 'all', pageIdx: 0 },

}

// console.log('checkedTodosCount:', initialState.checkedTodosCount)
export function appReducer(state = initialState, action = {}) { // {type,  payload}

    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.todoId)
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.todo]
            }

        case LOADING_IS_SHOWN:
            return { ...state, isLoadingShow: !state.isLoadingShow }

        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            }
        // case IS_CHECKED_TODO:
        //     return {
        //         ...state,
        //         todos: state.todos.map(todo => todo.isDone ? action.checkedTodosCount++ : action.checkedTodosCount--)
        //     }
        case INCREMENT:
            return { ...state, checkedTodosCount: state.checkedTodosCount + 1 }
        case DECREMENT:
            return { ...state, checkedTodosCount: state.checkedTodosCount - 1 }
        
            case SET_FILTER_BY:
            return { ...state, filterBy: action.val }
        default:
            return state;
    }

}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

window.gStore = store
