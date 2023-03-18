import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BrandCard = ({ item }) => {  
    const navigate = useNavigate()
    return (

        <div onClick={() => navigate(`/product/${item?._id}`, { state: { id: item._id, brand:item.brand} })}
        className="w-[220px] h-[220px] p-[10px] bg-blue-100 shadow-lg shadow-blue-500/50 cursor-pointer hover:bg-blue-300" title={item.name}>
            <img src={item?.images?.length && item.images[0]}
                alt=""
                className="w-[200px] h-[140px] "
            />
            <div>
                <p className="font-medium text-xl truncate "> {item.name}</p>
               
                
                <p className="flex">Giá: <p className="font-medium text-[16px] text-red-600 ml-1" >{item.price} VND</p></p>
                
            </div>
        </div>

    )
}
export default BrandCard