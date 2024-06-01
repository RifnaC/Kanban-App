// import Board from "./components/Board"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SignUp} from './components/SignUp'
import {Login} from './components/Login'



function App() {
  
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/signup" element={<SignUp />}/>
    <Route path="/login" element={<Login />}/>
   {/* <div className="h-screen m-4">
      <Board />
    </div> */}
   </Routes>
   </BrowserRouter>
    
  )
}

export default App
