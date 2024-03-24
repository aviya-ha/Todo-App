const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM
import { todoService } from '../service/todo.service.js'
import { showErrorMsg } from '../service/event-bus.service.js'

export function TodoDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [currTodo, setCurrTodo] = useState(null)

    useEffect(() => {
        const { id } = params
        todoService.getById(id)
            .then(todo => {
                if (!todo) return navigate('/todos')
                setCurrTodo(todo)
            })
            .catch(() => {
                showErrorMsg('Had issues loading todo');
            })
    }, [])

    if (!currTodo) return <h4>loading</h4>
    const { _id, txt, isDone, creatAt } = currTodo
    const formattedDate = new Date(creatAt).toLocaleString('he')
    console.log('formattedDate:', formattedDate)
    return (
        <div className="todo-details flex scale-in-hor-right container">
            <div className="todo-data-container">
                <h1>To Do: {txt}</h1>
                <h2>Created at: {formattedDate}</h2>
                <h2>is done? {isDone ? 'yes!' : 'no'}</h2>
                <h2>Id: {_id}</h2>

                <button className="back-btn" onClick={() => navigate('/todos')}>
                    Back to todos
                </button>
            </div>
        </div>
    )
}
