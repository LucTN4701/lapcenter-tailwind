import React from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/loader";
import iconcart from '../../assets/image/iconcart.png'
import icondelete from '../../assets/image/icondelete.jpg'
import { useNavigate } from "react-router-dom";


const MyCart = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    const handleGetAllProductsInCart = () => {
        setLoading(true)
        axios.get(`https://lapcenter-v1.onrender.com/api/cart/${localStorage.getItem('userId')}`)
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


    const handleDeleteProduct = (productId) => {
        axios
            .delete(`https://lapcenter-v1.onrender.com/api/cart/removeCartInCart/${productId}`,)
            .then(function (response) {
                console.log("Xoa thanh cong");
                handleGetAllProductsInCart()

            })
            .catch(function (error) {
                console.log("xoa that bai");
            });


    }
    useEffect(() => {
        handleGetAllProductsInCart()
    }, [])


    return (
        <div>
            <Navbar />
            {loading ? (<Loader />
            ) : (
                <div>
                    <p className="text-center my-5 font-semibold text-xl ">
                        Giỏ hàng của  <span className="text-blue-700">{localStorage.getItem('name')}</span>
                    </p>
                    <div className="px-20">
                        <table class="table-fixed w-full mb-10 ">
                            <thead>
                                <tr className="text-left border-b-[1px] border-black">
                                    <th className="w-[30%]">Hình ảnh</th>
                                    <th className="w-[70%]">Tên sản phẩm</th>
                                    <th className="w-[70%]">Hãng </th>
                                    <th className="w-[70%]">Giá</th>
                                    <th className="w-[70%]">Thao tác</th>



                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item) => (
                                    <tr className="border-b-[1px] border-gray-300  ">
                                        <td className="py-2">
                                            <img
                                                className="w-[100px] h-[65px]"
                                                src={item?.image} alt="" />
                                        </td>
                                        <td className="py-2">{item?.productName}</td>
                                        <td className="py-2">{item?.productBrand}</td>
                                        <td className="py-2 text-red-500">{item?.price} VND</td>
                                        <td className="py-2 flex mt-4">
                                            <img
                                                className="w-[30px] cursor-pointer hover:scale-125"
                                                src={iconcart}
                                                alt=""
                                                onClick={() => navigate('/buy', { state: { productInfo: item } })}


                                            />
                                            <img className="w-[30px] cursor-pointer hover:scale-125 mx-2"
                                                src={icondelete} alt=""
                                                onClick={() => { handleDeleteProduct(item?._id) }}
                                            />
                                        </td>







                                    </tr>
                                ))}


                            </tbody>
                        </table>
                        <p className="text-center text-red-500">
                            {data?.length === 0 && 'Không có sản phẩm nào'}
                        </p>
                    </div>

                </div>
            )}

        </div>

    )
}
export default MyCart