import Axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('https://kanban-app-beryl.vercel.app/auth/forgot-password'
      , { email })
      .then(response => {
        if (response.status === 200) {
          alert("reset link is send to your email check the mail");
          navigate('/login')
        }
      }).catch(err => console.error(err))
  }

  return (
    <div className="flex items-center justify-center h-screen bg-hero bg-cover">
      <form className="bg-transparent border-2 border-gray-400 p-6 rounded shadow-md w-80"
        onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-200">Forgot Password</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="text-white bg-gradient-to-r from-cyan-600 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 font-bold">Submit</button>
        </div>
      </form>
    </div>

  )
}
