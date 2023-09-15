import { useState } from "react"


const initTasksState = () => {
    const [tasks, setTodos] = useState([
        { id: crypto.randomUUID(), text: 'сходить в магазин', isDone: false },
        { id: crypto.randomUUID(), text: 'сходить под себя', isDone: true },
        { id: crypto.randomUUID(), text: 'сходить покурить', isDone: false },
    ])
    const tasksState ={tasks:tasks, setTodos:setTodos};
    return tasksState;
}

export default initTasksState