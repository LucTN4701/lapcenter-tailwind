import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        window.location.replace('/')
    }

    const navigateTo = (path) => {
        navigate(path)
        window.location.reload(true)
    }
    return (
        <div className="flex justify-between bg-gray-300 px-10 py-2 min-w-[525px]">
            <img src={logo} alt="" className="w-10 h-10 cursor-pointer" />
            <div className="flex">
                <Link to={"/"} className="ml-4- mt-2 font-medium hover:text-yellow-400"> Trang chủ </Link>
                <Link to={"/intro"} className="ml-4 mt-2 font-medium hover:text-amber-800">Giới thiệu</Link>
                <Link to={"/contact"} className="ml-4 mt-2 font-medium hover:text-red-700"> Liên hệ</Link>

                {localStorage.getItem('name') && (
                    <Link  
                    // to={"/mycart"}
                    onClick={() => navigateTo('/mycart')} className="ml-4 mt-2 font-medium hover:text-red-700"> Giỏ hàng</Link>

                )

                }

                {localStorage.getItem('name') && (
                    <Link to={"/history"} className="ml-4 mt-2 font-medium hover:text-red-700"> Lịch sử mua hàng</Link>

                )

                }

                {localStorage.getItem('isAdmin') === 'true' && (
                    <Link
                        // to={"/orders"} 
                        onClick={() => navigateTo('/orders')}
                        className="ml-4 mt-2 font-medium hover:text-red-700"> Quản lý đơn hàng</Link>

                )

                }


                {localStorage.getItem('name') ? (
                    <Link to={"/"} className="ml-4 mt-2 font-medium hover:text-red-700"
                        onClick={handleLogout}
                    > Đăng xuất </Link>
                ) : (
                    <Link to={"/login"} className="ml-4 mt-2 font-medium hover:text-red-700"

                    > Đăng nhập</Link>
                )}


            </div>

        </div>
    )
}
export default Navbar