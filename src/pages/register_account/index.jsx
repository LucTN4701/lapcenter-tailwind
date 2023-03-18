import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from 'react-spinners/ClipLoader'


const RegisterAccount = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)



    const handleChange = (val, field) => {
        // if (field === 'name') {
        //     setName(val)
        // }
        // if (field === 'email') {
        //     setEmail(val)
        // }
        // if (field === 'password') {
        //     setPassword(val)
        // }
        // if (field === 'phone') {
        //     setPhone(val)
        // }

        switch (field) {
            case 'name':
                setName(val)
                break;
            case 'email':
                setEmail(val)
                break;
            case 'password':
                setPassword(val)
                break;
            case 'phone':
                setPhone(val)
                break;

            default:
                break;
        }
    }

    const handleSubmitRegister = () => {
        setLoading(true)
        axios
            .post('https://lapcenter-v1.onrender.com/api/register', {
                name: name,
                email: email,
                phone: phone,
                password: password,
            })
            .then(function (response) {
                console.log(response);
                navigate('/login')
                setLoading(false)
                //localStorage.setItem('name', response.data.userName)
            })
            .catch(function (error) {
                console.log(error);
                alert("Dang ky tai khoan khong thanh cong. Vui long thu lai!!")
                setLoading(false)
            });
    }

    return (
        <div className="w-screen h-screen bg-green-500 flex items-center justify-center">
            <div className="w-[500px] h-auto bg-white shadow-lg shadow-gray-500/50">
                <p className="font-bold m-2 text-green-700 cursor-default italic">
                    Lapcenter
                </p>

                <p className="text-center m-7 mb-2 text-3xl font-bold text-green-500">
                    Register Account
                </p>
                <div className="w-[200px] mx-[150px] border-b-2 border-green-500" />
                <div className="p-8">
                    <p className="font-semibold mb-1">Username</p>
                    <input
                        className="w-full p-2 border-[1px] border-green-500 bg-white outline-none"
                        type="text"
                        value={name}
                        onChange={(e) => handleChange(e.target.value, 'name')}
                    />
                    <p className="font-semibold mb-1">Email</p>
                    <input
                        className="w-full p-2 border-[1px] border-green-500 bg-white outline-none"
                        type="text"
                        value={email}
                        onChange={(e) => handleChange(e.target.value, 'email')}
                    />
                    <p className="font-semibold mb-1">Phone</p>
                    <input
                        className="w-full p-2 border-[1px] border-green-500 bg-white outline-none"
                        type=""
                        value={phone}
                        onChange={(e) => handleChange(e.target.value, 'phone')}
                    />

                    <p className="font-semibold mb-1">Password</p>
                    <input
                        className="w-full p-2 border-[1px] border-green-500 bg-white outline-none"
                        type="password"
                        value={password}
                        onChange={(e) => handleChange(e.target.value, 'password')}
                    />


                </div>
                <div className="w-[100px] bg-green-500 m-auto mt-4 p-2 rounded hover:bg-green-600 cursor-pointer" onClick={handleSubmitRegister}>
                    {loading ? (
                        <div className="flex justify-center">
                            <ClipLoader color="white" size={20} loading={loading} />
                        </div>
                    ) : (
                        <p className="text-center text-white font-semibold"  >
                            Register</p>
                    )}

                </div>
                <div className="w-[200px] m-auto" onClick={() => navigate('/login')}>
                    <p className="text-green-400 hover:text-green-700 cursor-pointer mt-3">
                        Login if you have Account
                    </p>
                </div>

                <div className="w-[145px]" onClick={() => navigate('/')}>
                    <p className="underline hover:text-green-500 cursor-pointer m-3 mb-6">
                        Back to home
                    </p>
                </div>

            </div>

        </div>
    )

}

export default RegisterAccount
