import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import { useState } from "react";
import { useFetcher, useLocation } from "react-router-dom";

const ProductDetail = () => {
    const { state } = useLocation()
    const [data, setData] = useState()
    const [thumbnail, setThumbnail] = useState()



    console.log('Stata', state.id);

    const fetchAPIAxios = () => {
        axios.get(`https://lapcenter-v1.onrender.com/api/product/getProductById/${state.id}`)
            .then(function (response) {
                // handle success
                console.log('response', response.data.response)
                setData(response.data.response)
                setThumbnail(response.data.response.images[0])

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }


    useEffect(() => {
        fetchAPIAxios()
    }, [])


    return (

        <div>
            <Navbar />
            <div className="px-10 py-5">

                <p className="text-2xl font-semibold">{data?.name}</p>
                <div className="flex">
                    <div className="flex">
                        <p>Tình trạng:</p>
                        <p className="ml-2">Còn hàng</p>
                    </div>
                    <div className="flex ml-6">
                        <p>Bảo hành:</p>
                        <p className="ml-2"> 24 tháng</p>

                    </div>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between">
                    <div className="w-[33%] px-10">
                        <img className="w-full h-auto"
                            src={thumbnail} alt="" />
                        <div className="flex justify-center">
                            {data?.images?.map((img, index) => (
                                <img
                                    key={index}
                                    className="w-10 h-10 border-gray-600 border-[1px] mt-2 mx-2 cursor-pointer "
                                    src={img}
                                    alt=""
                                    onClick={() => setThumbnail(img)}
                                />

                            ))}

                        </div>
                    </div>

                    <div className="w-[33%] px-3">
                        <span>Giá bán: </span> <span>{data?.price}</span>
                        <div>
                            <div className="bg-green-500 p-5 ">
                                <p className="text-lg font-semibold text-slate-100"> Khuyến mãi - Quà tặng</p>
                            </div>
                            <div className="p-5 border-dotted border-x-gray-700 border-2">
                                <p className="text-lg font-semibold">Thông tin quà tặng</p>
                            </div>
                        </div>
                        <div className="flex justify-center my-4">
                            <div className="w-[110px] p-2 bg-red-500 rounded-lg hover:bg-red-700 cursor-pointer ">
                                <p className="text-sm font-semibold text-slate-100 text-center">Mua ngay</p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <span className="mt-[2px]">Gọi ngay</span>
                            <span className="mx-2 text-lg text-red-600 font-semibold">0923 145 354</span>
                            <span className="mt-[2px]">Để giữ hàng</span>

                        </div>

                    </div>
                    <div className="w-[33%] px-4">
                        <div>
                            <p className="text-lf font-semibold">Điện thoại tư vấn - Đặt hàng</p>
                            <ul>
                                <li className="list-disc ml-10 ">Văn Lực: 0313316443</li>
                                <li className="list-disc ml-10">Duy Trung: 0369412357</li>
                                <li className="list-disc ml-10">Huy Hoàng: 0369712584</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">Điạ chỉ mua hàng</p>
                            <ul>
                                <li className="list-disc ml-10 ">123 Lê Lợi - Đà nẵng</li>
                                <li className="list-disc ml-10">65 Nguyễn Hữu Thọ - Đà Nẵng</li>
                                <li className="list-disc ml-10">153 Điện Biên Phủ - Đà Nẵng</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-5" />
                <div className="px-20">
                    <table class="table-fixed w-full mb-10 ">
                        <thead>
                            <tr className="text-left border-b-[1px] border-black">
                                <th className="w-[30%]">Phần cứng</th>
                                <th className="w-[70%]">Thông số kỹ thuật</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b-[1px] border-gray-300  ">
                                <td className="py-2">Model</td>
                                <td className="py-2">{data?.model}</td>

                            </tr>
                            <tr className="border-b-[1px] border-gray-300">
                                <td className="py-2">RAM</td>
                                <td className="py-2">{data?.ram}</td>

                            </tr>
                            <tr className="border-b-[1px] border-gray-300">
                                <td className="py-2">Ổ cứng</td>
                                <td className="py-2">{data?.disk}</td>

                            </tr>
                            <tr className="border-b-[1px] border-gray-300">
                                <td className="py-2">Card đồ hoạ</td>
                                <td className="py-2">{data?.card}</td>

                            </tr>
                            <tr className="border-b-[1px] border-gray-300">
                                <td className="py-2">Màn hình</td>
                                <td className="py-2">{data?.monitor}</td>

                            </tr>
                        </tbody>
                    </table>

                </div>


            </div>
        </div>
    )
}

export default ProductDetail