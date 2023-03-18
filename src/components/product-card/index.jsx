import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductCart = ({ item }) => {

    const navigate = useNavigate()
    return (

        <div className="w-[220px] h-[320px] p-[10px] bg-blue-100 shadow-lg shadow-blue-500/50">
            <img src={item?.images?.length && item.images[0]}
                alt=""
                className="w-[200px] h-[140px]"
            />
            <div>
                <p className="font-medium text-xl truncate "> {item.name}</p>
                <p className="flex">Hãng: <p className="font-medium text-[16px] ml-1 truncate"> {item.brand}</p>
                </p>
                <p className="flex">Chip: <p className="font-medium text-[16px] ml-1 truncate" >{item.cpu}</p> </p>
                <p className="flex">Giá: <p className="font-medium text-[16px] text-red-600 ml-1" >{item.price} VND</p></p>
                <div onClick={() => navigate(`/product/${item?._id}`, {
                    state: { id: item._id, brand: item.brand }

                })} className="w-[160px] py-2 bg-orange-500 rounded-xl my-2 m-auto hover:bg-green-500">
                    <p className="text-center font-medium text-lime-100 cursor-pointer">Xem sản phẩm</p>
                </div>
            </div>


        </div>

    )
}
export default ProductCart