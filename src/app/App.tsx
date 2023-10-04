
import { TodoPage } from "pages/TodoPage";
import "./styles/index.scss";
import { MainPage } from "pages/MainPage";
import { Route, Routes } from "react-router-dom";


const App = () => {


    return (
        <div>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='todo' element={<TodoPage/>}/>  
            </Routes>



        </div >
    )
}

export default App;