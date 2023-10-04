import { configureStore } from "@reduxjs/toolkit";
import visibilityFilter from "features/filterReducer/visibilityFilterSlice";
import findingString from "features/findReducer/findSlice";
import todos from "features/todosReducer/todosSlice";


export default configureStore({
    reducer: {
        todos: todos,
        visibilityFilter: visibilityFilter,
        findingString: findingString,
    }
})

