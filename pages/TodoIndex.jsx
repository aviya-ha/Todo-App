const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { todoService } from '../service/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../service/event-bus.service.js'
import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { Loading } from '../cmps/Loading.jsx'
import { TodoSort } from '../cmps/TodoSort.jsx'
import { TodoAdd } from '../cmps/TodoAdd.jsx'

import { loadTodo, saveTodo, removeTodo, checkTodo } from '../store/actions/todo.actions.js'
import { LOADING_IS_SHOWN ,SET_FILTER_BY  } from '../store/store.js'


export function TodoApp() {
    const dispatch = useDispatch()
    
    const filterBy = useSelector((storeState) => storeState.filterBy)
    const todos = useSelector(storeState => storeState.todos)
    // const isLoadingShown = (storeState => storeState.isLoadingShown)
    const [sortBy, setSort] = useState('time')


    useEffect(() => {
        loadTodo(filterBy)
            .catch(err => {
                showErrorMsg('Cannot load todo!')
            })
    }, [filterBy])

    function setFilter(filter) {

        const action = {
            type: SET_FILTER_BY,
            val: filter,
        }
        dispatch(action)
    }

    function onSetSort(sort) {
        setSort(sort)
    }


    function onAddTodo(todoToSave) {      
        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add todo')
            })
    }

    function onEditTodo(todoToSave) {      
        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add todo')
            })
    }

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove todo')
            })
    }

    function onCheckBox(todo) {
        checkTodo(todo)
        .catch(err => {
            showErrorMsg('Cannot check todo')
        })
    }

    function todosForDisplay() {
        let sortedTodos = [...todos]
        if (sortBy === 'txt') {
            sortedTodos = sortedTodos.sort((a, b) => a.txt.localeCompare(b.txt));
        } else {
            sortedTodos = sortedTodos.sort((a, b) => a.createdAt - b.createdAt);
        }
        return sortedTodos
    }


    return <div>
        <h1>Todos</h1>
        <main>
            <TodoFilter onSetFilter={setFilter} onSetSort={onSetSort}/>
            <TodoAdd onAddTodo={onAddTodo} />
            <TodoList
                onCheckBox={onCheckBox}
                todos={todosForDisplay()}
                onRemoveTodo={onRemoveTodo}
                onEditTodo={onEditTodo}
            />
        </main>
    </div>
}
