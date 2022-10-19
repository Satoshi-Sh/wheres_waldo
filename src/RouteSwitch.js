import { BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Board from "./Board";
import Game from "./Game"
import Timer from  "./Timer"


const RouteSwitch = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/game' element={<Game />}/>
            <Route path='/' element={<App />} />
            <Route path='/board' element={<Board />}/>
          </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;