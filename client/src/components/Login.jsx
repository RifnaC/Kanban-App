import Axios  from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] =useState("");
  const [password, setPassword] =useState("");
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) =>{
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/signin',{
      email,
      password
    }).then(response => {
      if(response.status === 200){
        navigate("/home")
      }
    }).catch(err => console.log(err))
  }

  return (
    <div className="flex items-center justify-center h-screen bg-hero bg-cover">
      <form className="bg-transparent border-2 border-gray-400 p-6 rounded shadow-md w-80" 
      onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-200">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" 
          onChange={(e) => setPassword(e.target.value)}
          type="password" placeholder="Password" />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="text-white bg-gradient-to-r from-cyan-600 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 font-bold">Sign In</button>
        </div>
        <div className="mt-3 border-t-2 border-blue-100 "></div>
        <div className="flex justify-between text-blue-100 mt-3">
          <p>Don't have account?</p>
          <Link to="/signup" className="hover:text-blue-400">Sign Up</Link>
          </div>
      </form>
    </div>


  )
}

export default Login