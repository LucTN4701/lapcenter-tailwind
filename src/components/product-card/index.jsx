import React from "react";

const ProductCart = () => {
    return (
        
        <div className="w-[220px] h-[320px] p-[10px] bg-blue-100 shadow-lg shadow-blue-500/50">
            <img src="https://fptshop.com.vn/Uploads/images/2015/0511/Lenovo-IdeaPad-Gaming-3-fpt-1.jpg"
                alt=""
                className="w-[200px] h-[140px]"
            />
            <div>
                <p className="font-medium text-xl "> Laptop abc</p>
                <p className="flex">Hãng: <p className="font-medium text-[16px] ml-1"> Dell </p>
                </p>
                <p className="flex">Chip: <p className="font-medium text-[16px] ml-1" >Itel core I7</p> </p>
                <p className="flex">Giá: <p className="font-medium text-[16px] text-red-600 ml-1" >10000000</p></p>
                <div className="w-[160px] py-2 bg-green-500 rounded-xl my-2 m-auto hover:bg-green-700">
                    <p className="text-center font-medium text-lime-100 cursor-pointer">Xem san pham</p></div>
            </div>


        </div>

    )
}
export default ProductCart