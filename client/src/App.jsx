import Board from "./components/Board"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from './components/SignUp'
import { Login } from './components/Login'
import { ForgotPassword } from "./components/ForgotPassword";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Board />} />
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
