import { useState } from "react";
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
export const Reset = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const {token} = useParams()
    const validateForm = () => {
        if (password.length < 6) {
          setError('Password should be at least 6 characters long');
          return false
        }
    
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return false
        }
        setError("")
        return true
      };
    const handleSumbit = (e) => {
        e.preventDefault();
        if(validateForm()){
            Axios.post("http://localhost:3000/auth/reset-password/"+token, { password, confirmPassword })
            .then((response) => {
                if (response.status === 200) {
                    navigate('/login')
                }
            })
            .catch((err) => console.log(err))
        }
    }
    return (
        <div className="flex items-center justify-center bg-hero bg-cover h-screen">
            <form className="bg-transparent border-2 border-gray-400 p-6 rounded shadow-md w-80" onSubmit={handleSumbit}>
                <h2 className="text-2xl text-center font-bold mb-4 text-blue-100">Reset Password</h2>
                {error && <p className="text-sm text-center font-bold mb-4 text-red-200">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="password">New Password</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="confirm-password">Confirm Password</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="flex items-center justify-center">
                    <button type="submit" className="text-white bg-gradient-to-r from-cyan-600 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 font-bold">Reset</button>
                </div>
            </form>
        </div>
    );
};

