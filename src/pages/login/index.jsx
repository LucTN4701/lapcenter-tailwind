import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from 'react-spinners/ClipLoader'

const fakeAccount = {
    username: 'admin',
    password: 'admin',
}

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const handleChange = (val, field) => {
        if (field === 'username') {
            setUsername(val)
        } else {
            setPassword(val)
        }
    }


    const handleLogin = () => {
        console.log('login', username, password)
        if (username === fakeAccount.username && password === fakeAccount.password) {
            navigate('/')
        } else {
            alert("Tai khoan or mat khau khong chinh xac. Vui long thu lai!!")
        }
    }

    const handleSubmitLogin = () => {
        setLoading(true)
        axios.post('https://lapcenter-v1.onrender.com/api/login', {
            username: username,
            password: password
        })
            .then(function (response) {
                console.log(response);
                console.log('userName:', response.data.userName);
                navigate('/')
                setLoading(false)
                localStorage.setItem('name', response.data.userName)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('isAdmin', response.data.isAdmin)


            })
            .catch(function (error) {
                console.log(error);
                alert("Tai khoan or mat khau khong chinh xac. Vui long thu lai!!")
                setLoading(false)
            });
    }
    const handleKeyDown =(e)=> {
        if (e.key === 'Enter') { 
          console.log('do validate');
          handleSubmitLogin()
        }
      }

    return (
        <div className="w-screen h-screen bg-green-500 flex items-center justify-center">
            <div className="w-[500px] h-auto bg-white shadow-lg shadow-gray-500/50">
                <p className="font-bold m-2 text-green-700 cursor-default italic">
                    Lapcenter
                </p>
                <p className="text-center mt-7 mb-2 text-3xl font-bold text-green-500">
                    LOGIN
                </p>
                <div className="w-[200px] mx-[150px] border-b-2 border-green-500" />
                <div className="p-8">
                    <p className="font-semibold mb-1 ">Username</p>
                    <input
                        className="w-full p-2 border-[1px] border-green-500 bg-white outline-none"
                        type="text"
                        value={username}
                        onChange={(e) => handleChange(e.target.value, 'username')}
                    />
                    <p className="font-semibold mb-1 mt-3">Password</p>
                    <input
                        className="w-full p-2 border-[1px] border-green-500 bg-white outline-none"
                        type="password"
                        value={password}
                        onChange={(e) => handleChange(e.target.value, 'password')}
                        onKeyDown={handleKeyDown}

                    />
                    <div className="w-[100px] bg-green-500 m-auto mt-4 p-2 rounded hover:bg-green-600 cursor-pointer" onClick={handleSubmitLogin}>

                        {loading ? (
                            <div className="flex justify-center">
                                <ClipLoader color="white" size={20} loading={loading} />
                            </div>
                        ) : (
                            <p className="text-center text-white font-semibold">Login</p>
                        )}
                    </div>
                    <div className="w-[175px] m-auto" onClick={() => navigate('/register')}>
                        <p className="text-green-400 hover:text-green-700 cursor-pointer mt-3">
                            Register a new account
                        </p>
                    </div>
                    <div className="w-[105px]" onClick={() => navigate('/')}>
                        <p className="underline hover:text-green-500 cursor-pointer mt-3">
                            Back to home
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login