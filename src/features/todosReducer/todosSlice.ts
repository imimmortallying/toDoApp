
import { createSlice } from '@reduxjs/toolkit'

interface Todo {
    id: string,
    text: string,
    completed: boolean
}

interface Action {
    type?: string,
    id?: string,
    text?: string
    filter?: string,
}


export const todosSlice = createSlice({
    name: 'todos',
    initialState: [
        { text: 'Сходить в магазин', id: '1', completed: true, importance: 'not chosen', description: 'Сходить нужно до прихода родителей домой',  },
        { text: 'Сходить под себя', id: '2', completed: true, importance: 'not chosen', description: 'Можно в любое время',  },
        { text: 'Убраться в комнате', id: '3', completed: true, importance: 'not chosen', description: 'Нахуй надо',  },
    ],
    reducers: {

        add: (state, action) => {
            
            state.push({ id: action.payload.id, text: action.payload.text, completed: false, importance: 'not chosen', description: '' })

        },
        toggle: (state, action) => {
            state.forEach((i) => {
                if (i.id === action.payload) {
                    i.completed = !i.completed
                }
            })
        },
        remove: (state, action) => {
            state.forEach((i, index) => {
                if (i.id === action.payload) {
                    state.splice(index, 1)
                }
            })
        },
        changeImportance: (state, action) => {
            state.forEach((i) => {
                if (i.id === action.payload.id) {
                    i.importance = action.payload.value
                }
            })
        },
        changeDesctiption: (state, action) => {
            state.forEach((i) => {
                if (i.id === action.payload.id){
                    i.description = action.payload.inputText
                }
            })
        }
    }
})


export default todosSlice.reducer
export const { add, toggle, remove, changeImportance, changeDesctiption} = todosSlice.actions

export const selectTodoById = (state:any, todoId:any) => { // используется для отрисовки туду, исходя из полученного id. Todo.tsx
    return state.todos.find((todo:any) => todo.id === todoId)
}

//! ниже идет мемоизация при помощи reselect библиотеки
// способ работы со стейтом вместо const todoIds = useSelector(selectTodoIds, shallowEqual) который позволяет:
// 1) заменить shallowEqual, чтобы не вызывать ре-рендеринг всего списка задач, связанного с тем, что .map возвращает новую ссылку
// 2) сейчас я совмещаю 2 части стейта - фильтры и тудус - внутри Todo.tsx. CreateSelector же принимает несколько частей стейта, 
// получает измененное знаечние на их основе, и затем эту ф-ю селектор можно передать для рендеринга в TodoList.tsx. 
// при этом логика по фильтрации выносится из Todo компонента и становится проще. 
// таким образом, я получаю отфильтрованные задачи, нахожу Id эти задач и лишь их отрисовываю, не изменяя стейт - получается своеобразный middleware

// 
import { createSelector } from 'reselect'
export const selectFilteredTodos = createSelector(
    state => state.todos,
    state => state.visibilityFilter.acomplishment,
    state => state.visibilityFilter.importance,

    (todos:[], acomplishment, importance:[]) => {
        if (acomplishment === 'all' && importance.length === 0) {
            return todos
        }
        
        const completedStatus = acomplishment === 'closed' // вернет тру или фолс, т.е отфильтрует и оставит только туду с тру или с фолс
        // @ts-ignore
        // return todos.filter(todo => todo.completed === completedStatus) // это проверка совпадения состояния todo и сост. фильтра
        return todos.filter(todo => {
            // @ts-ignore
            const statusMatches = acomplishment === 'all' || todo.completed === completedStatus
            // @ts-ignore
            const importanceMatches = importance.length === 0 || importance.includes(todo.importance)
            console.log(statusMatches && importanceMatches)
            return statusMatches && importanceMatches
          })
    }
   
)

export const selectFindedTodos = createSelector(
    state => state.findingString,
    selectFilteredTodos,
    // @ts-ignore
    (findingString, selectFilteredTodos) => selectFilteredTodos.filter((item:any) => {
        // return item.text.split(' ').find((str:any)=>str.includes('')) // нужно также предусммотреть не только совпадение в 1 слове, но и совпадение со всей цельной строкой
        return item.text.includes(findingString)
    })
)



export const selectFilteredTodoIds = createSelector(
    // Pass our other memoized selector as an input
    selectFindedTodos,
    // And derive data in the output selector
    // @ts-ignore
    filteredTodos => filteredTodos.map(todo => todo.id)
  )