
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const LOADING_IS_SHOWN = 'LOADING_IS_SHOWN'
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const IS_CHECKED_TODO = 'IS_CHECKED_TODO'

const initialState = {
    todos: [],
    checkedTodosCount: 0,
    isLoadingShow: false,
    filterBy: { txt: '', isDone: 'all', pageIdx: 0 },

}

export function todoReducer(state = initialState, action = {}){
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

        
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            }
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