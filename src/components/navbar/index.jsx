import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.png";

const Navbar = () => {
    return (
        <div className="flex justify-between bg-lime-600 px-10 py-2 min-w-[525px]">
            <img src={logo} alt="" className="w-10 h-10 cursor-pointer" />
            <div className="flex">
                <Link to={"/"} className="ml-4- mt-2 font-medium hover:text-yellow-400"> Trang chu </Link>
                <Link to={"intro"} className="ml-4 mt-2 font-medium hover:text-amber-800">Gioi thieu</Link>
                <Link to={"contact"} className="ml-4 mt-2 font-medium hover:text-red-700"> Lien he</Link>
            </div>

        </div>
    )
}
export default Navbar