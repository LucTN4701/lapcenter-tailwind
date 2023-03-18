import React from "react";
import { useState } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../../components/loader";


const History = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()


    const handleGetAllProductsInCart = () => {
        setLoading(true)
        axios.get(`https://lapcenter-v1.onrender.com/api/history/${localStorage.getItem('userId')}`)
            .then(function (response) {
                // handle success
                setLoading(false)

                setData(response?.data?.products)
                console.log(response?.data?.products);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)
            })
    }

    useEffect(() => {
        handleGetAllProductsInCart()
    }, [])



    return (
        <div>
            <Navbar />
            {loading ? (<Loader />) : (
                <div>
                    <p className="text-center font-semibold p-5 text-xl">
                        Lịch sử mua hàng của <span className="text-blue-500">{localStorage.getItem('name')}</span>
                    </p>
                    <div className="px-40">
                        <table class="table-fixed w-full mb-10 ">
                            <thead>
                                <tr className="text-left border-b-[1px] border-black">
                                    {/* <th className="w-[30%]">Hình ảnh</th> */}
                                    <th className="w-[100%]">Tên sản phẩm</th>
                                    <th className="w-[40%]">Hãng </th>
                                    {/* <th className="w-[70%]">Giá</th> */}
                                    <th className="w-[60%]">Phone</th>
                                    <th className="w-[60%]">Địa chỉ</th>
                                    <th className="w-[60%]">Số lượng</th>


                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item) => (
                                    <tr>
                                        {/* <td className="py-2"  >
                                    <img className="w-[100px] h-[65px]" src={item?.image} alt="" />
                                </td > */}
                                        <td className="py-2" >{item?.productName}</td >
                                        <td className="py-2" >{item?.productBrand}</td >
                                        {/* <td className="py-2 text-red-500" >{item?.price} VND </td > */}
                                        <td className="py-2" >{item?.phone}</td >
                                        <td className="py-2" >{item?.address}</td >
                                        <td className="py-2" >{item?.quantity}</td >

                                    </tr>

                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

            )}

        </div>

    )
}

export default History