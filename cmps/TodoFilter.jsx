const { useEffect, useState, useRef } = React

import { todoService } from "../service/todo.service.js"
import { utilService } from "../service/util.service.js"
import { TodoSort } from "./TodoSort.jsx"

export function TodoFilter({onSetFilter ,onSetSort}) {

    const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter)
    const debouncedSetFilterRef = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        debouncedSetFilterRef.current(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterBy)
    }


    return (
        <section className="todo-filter">
            <h2>Todos Filter</h2>
            <TodoSort onSetSort={onSetSort}/>
            <form onSubmit={onSubmit}>
                <div className="radio-sort">
                    <label htmlFor="all">

                        <input defaultChecked type="radio" name="isDone" value="all" id="all" onChange={handleChange} />
                        All
                    </label>
                    <label htmlFor="done">

                        <input type="radio" name="isDone" value="done" id="done" onChange={handleChange} />
                        Done
                    </label>
                    <label htmlFor="undone">
                        <input type="radio" name="isDone" value="undone" id="undone" onChange={handleChange} />
                        Active
                    </label>
                </div>
                <div className="search-inputs">
                    <input
                        className="filter-input"
                        placeholder="Search todo..."
                        name="txt"
                        value={filterBy.txt}
                        onChange={handleChange}
                    />
                </div>
                <button>Submit</button>
            </form>

        </section>
    )
}