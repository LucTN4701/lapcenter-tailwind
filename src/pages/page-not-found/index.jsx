import React from "react";
import { useNavigate } from "react-router-dom";
import pageNotFound from '../../assets/image/pagenotffound.jpg'

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div>
                <img src={pageNotFound} alt="not-found" className="w-[400px] h-auto" />
                <p className="mt-4 font-bold text-2xl text-center">Page Not Found</p>
                <div onClick={() => navigate('/')}
                    className="w-[120px bg-green-500 m-auto mt-4 p-2 rounded hover:bg-green-600]"
                    >
                        <p className="text-center text-white font-semibold">Go home</p>
                </div>
            </div>
        </div>
    )
}
export default PageNotFound