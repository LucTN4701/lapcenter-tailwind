import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../components/navbar";
import ProductCart from "../../components/product-card";
import Slider from "../../components/slider";
import { fakeData } from "./data";
import Loader from "../../components/loader";
import ReactPaginate from 'react-paginate';
import './style.css'


const Home = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState(fakeData)
    const [sort, setSort] = useState('')
    const [brand, setBrand] = useState('')
    const [totalpage, setTotalpage] = useState('')


    const [loading, setLoading] = useState(false)

    const handleSearch = (val) => {
        setSearch(val)
    }

    const handleSearching = (productName, productBrand, sortPrice) => {
        // console.log('abc: ', `https://lapcenter-v1.onrender.com/api/product?productName=${productName}&productBrand=${productBrand}&oderByDirection=${sortPrice}&oderByColumn=price`);
        setLoading(true)
        axios
            .get(`https://lapcenter-v1.onrender.com/api/product`, {
                params: {
                    productName: productName,
                    productBrand: productBrand,
                    orderByDirection: sortPrice,
                    orderByColumn: 'price',
                    pageSize: 5,
                    pageNumber: 1
                },
            })

            // .get(`https://lapcenter-v1.onrender.com/api/product?productName=${productName}&productBrand=${productBrand}&orderByDirection=${sortPrice}&orderByColumn=price`,    )

            .then(function (response) {
                // handle success
                console.log('response', response.data)
                setData(response.data.products)
                setLoading(false)
                setTotalpage(response.data.totalPage)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)
            })
    }

    const handlePagination = (productName, productBrand, sortPrice, pageNumber) => {
        // console.log('abc: ', `https://lapcenter-v1.onrender.com/api/product?productName=${productName}&productBrand=${productBrand}&oderByDirection=${sortPrice}&oderByColumn=price`);
        setLoading(true)
        axios
            .get(`https://lapcenter-v1.onrender.com/api/product`, {
                params: {
                    productName: productName,
                    productBrand: productBrand,
                    orderByDirection: sortPrice,
                    orderByColumn: 'price',
                    pageSize: 5,
                    pageNumber: pageNumber
                },
            })

            // .get(`https://lapcenter-v1.onrender.com/api/product?productName=${productName}&productBrand=${productBrand}&orderByDirection=${sortPrice}&orderByColumn=price`,    )

            .then(function (response) {
                // handle success
                //console.log('response', response.data)
                setData(response.data.products)
                setLoading(false)
                //setTotalpage(response.data.totalPage)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)
            })
    }

    const handleSubmitSearch = () => {
        setData(fakeData.filter((item) => item.productName.toLowerCase().includes(search.toLowerCase())))
    }

    const handleFilterBrand = (value) => {
        //console.log(value)
        //setData(fakeData.filter((item) => item.productBrand.toLowerCase().includes(value.toLowerCase())))
        setBrand(value)
        console.log('VALUE:', value);
        handleSearching(search, value, sort)
    }

    const handleSortPrice = (value) => {
        setSort(value)
        handleSearching(search, brand, value)
        // if (value === 'asc') {
        //     setData(
        //         fakeData.sort((a, b) => a.price - b.price))
        // } else if (value === 'desc') {
        //     setData(
        //         fakeData.sort((a, b) => b.price - a.price))
        // } else {
        //     setData(fakeData)
        // }
    }



    const handleSearchProductsName = () => {
        handleSearching(search, brand, sort)
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
        setLoading(true)
        axios.get('https://lapcenter-v1.onrender.com/api/product')
            .then(function (response) {
                // handle success
                console.log('response', response.data)
                setData(response.data.products)
                setLoading(false)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)
            })
    }

    useEffect(() => {
        //fetchAPI()
        console.log('Ham nay se chay dau tien');
        //fetchAPIAxios()
        handleSearching('', '', '')
    }, [])
    

    const handleChangePage = (pageNumber) => {
        console.log("PAGE: ", pageNumber);
        handlePagination (search, brand, sort, pageNumber)
    }

    return (
        <div>
            <Navbar />
            <div className="px-10 py-5 min-w-[525px]">
                {localStorage.getItem('name') && (
                    <p className="text-right font-semibold mb-2 text-red-600">Xin chao! {localStorage.getItem('name')}</p>
                )}
                <Slider />
                <div className="flex mb-5 justify-end">
                    <div className="flex mr-5">
                        <input type="text"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Nhập tên sản phẩm" className="border-[1px] border-gray-400 py-2 px-2 rounded outline-none" />
                        <div className=" bg-green-500 p-2 rounded hover:bg-green-700 cursor-pointer">
                            <p className="text-white" onClick={handleSearchProductsName}>Tìm kiếm</p>
                        </div>
                    </div>
                    <div className="flex mr-5">
                        <p className="mt-2 mr-1 font-semibold">Hãng</p>
                        <select name="" id="" className="border-[1px] border-gray-400 py-2 px-2 rounded w-[100px]"
                            onChange={(e) => handleFilterBrand(e.target.value)}
                        >


                            <option value=""> Tất cả </option>
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
                            <option value="">Tất cả</option>
                            <option value="desc">Từ cao đến thấp</option>
                            <option value="asc">Từ thấp đến cao</option>
                        </select>

                    </div>
                </div>
                {loading ? (
                    <Loader loading={loading} />
                ) : (
                    <div>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 pb-20">

                            {data?.map((item) => (
                                <ProductCart item={item} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="pagination">
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        //breakClassName={"break-me"}
                        pageCount={totalpage}
                        //marginPagesDisplayed={2}
                        //pageRangeDisplayed={4}
                        onPageChange={(e) => handleChangePage(e.selected + 1)}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />

                </div>
            </div>
        </div>
    )
}
export default Home