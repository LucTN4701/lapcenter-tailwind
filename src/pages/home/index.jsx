import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../components/navbar";
import ProductCart from "../../components/product-card";
import Slider from "../../components/slider";
import { fakeData } from "./data";


const Home = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState(fakeData)
    const [sort, setSort] = useState('')



    const handleSearch = (val) => {
        if (val) {
            setSearch(val)
        }
        else {
            setSearch(val)
            setData(fakeData)
        }
    }

    const handleSubmitSearch = () => {
        setData(fakeData.filter((item) => item.productName.toLowerCase().includes(search.toLowerCase())))

    }

    const handleFilterBrand = (value) => {
        console.log(value)
        setData(fakeData.filter((item) => item.productBrand.toLowerCase().includes(value.toLowerCase())))
    }

    const handleSortPrice = (value) => {
        setSort(value)
        if (value === 'asc') {
            setData(
                fakeData.sort((a, b) => a.price - b.price))
        } else if (value === 'desc') {
            setData(
                fakeData.sort((a, b) => b.price - a.price))
        } else {
            setData(fakeData)
        }
    }


    // const fetchAPI = () => {
    //     fetch('https://lapcenter-v1.onrender.com/api/product')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('DATA: ', data)
    //             setData(data.products)
    //         })
    //         .catch((error) => console.log(error))
    // }

    const fetchAPIAxios = () => {
        axios.get('https://lapcenter-v1.onrender.com/api/product')
            .then(function (response) {
                // handle success
                console.log('response', response.data)
                setData(response.data.products)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    useEffect(() => {
        //fetchAPI()
        fetchAPIAxios()
    }, [])



    return (
        <div>
            <Navbar />
            <div className="px-10 py-5 min-w-[525px]">
                <Slider />
                <div className="flex mb-5 justify-end">
                    <div className="flex mr-5">
                        <input type="text"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Nhập tên sản phẩm" className="border-[1px] border-gray-400 py-2 px-2 rounded outline-none" />
                        <div className=" bg-green-500 p-2 rounded hover:bg-green-700 cursor-pointer">
                            <p className="text-white" onClick={handleSubmitSearch}>Tìm kiếm</p>
                        </div>
                    </div>
                    <div className="flex mr-5">
                        <p className="mt-2 mr-1 font-semibold">Hãng</p>
                        <select name="" id="" className="border-[1px] border-gray-400 py-2 px-2 rounded w-[100px]"
                            onChange={(e) => handleFilterBrand(e.target.value)}
                        >


                            <option value=""> Tat ca </option>
                            <option value="Asus">Asus</option>
                            <option value="Acer">Acer</option>
                            <option value="Lenovo">Lenovo</option>
                            <option value="Dell">Dell</option>

                        </select>
                    </div>
                    <div className="flex">
                        <p className="mt-2 mr-1 font-semibold">Giá</p>
                        <select name="" id="" className="border-[1px] border-gray-400 py-2 px-2 rounded w-[160px]"
                            onChange={(e) => handleSortPrice(e.target.value)}>
                            <option value="">Tat ca</option>
                            <option value="desc">Từ cao đến thấp</option>
                            <option value="asc">Từ thấp đến cao</option>
                        </select>

                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

                    {data?.map((item) => (
                        <ProductCart item={item} />
                    ))}
                </div>


            </div>

        </div>
    )
}
export default Home