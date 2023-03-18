import React from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/loader";
import icondelete from '../../assets/image/icondelete.jpg'
import iconview from '../../assets/image/iconview.png'
import iconclose from '../../assets/image/iconclose.png'
import Modal from 'react-modal';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import UpdateOrderDialog from "./updateOderDialog";
import toastMessage from "../../components/messages";



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};






const Orders = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [orderInfo, setOrderInfo] = useState()

    // const { state } = useLocation()
    // const [quantity, setQuantity] = useState(1)
    // const [name, setName] = useState('')
    // const [phone, setPhone] = useState('')
    // const [address, setAddress] = useState('')
    // const [isDisabled, setIsDisabled] = useState(true)
    const [IsOpen, setIsOpen] = React.useState(false)
    const [IsOpenViewOrder, setsOpenViewOrder] =useState(false)


    // const ordersInfo = state?.ordersInfo

    const handleGetAllOrders = () => {
        setLoading(true)
        axios.get(`https://lapcenter-v1.onrender.com/api/order?pageSize=50&pageNumber=1`)
            .then(function (response) {
                // handle success
                setLoading(false)
                console.log(response.data);

                setData(response?.data?.orders)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)
            })
    }

    const handleCloseViewOrder=()=>{
        setsOpenViewOrder(false)
    }
    // const handleOpenModal = () => {
    //     setIsOpen(true)
    // }

    // const handleCloseModal = () => {
    //     setIsOpen(false)
    // }




    const handleDeleteOrder = (orderId) => {
        axios
            .delete(`https://lapcenter-v1.onrender.com/api/order/removeOrder/${orderId}`,)
            .then(function (response) {
                console.log("Xoa thanh cong");
                handleGetAllOrders()
                toastMessage('success','😃Xoá đơn hàng thành công!')
                // toast.success('😃Xoá đơn hàng thành công!', {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "colored",

                // });

            })
            .catch(function (error) {
                console.log("xoa that bai");
                toastMessage('error', 'Xoá đơn hàng không thành công')
                // toast.error('🦄 Xoá đơn hàng không thành công', {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "colored",

                // });
            });


    }
    const handleRenderStatus = (number) => {
        switch (number) {
            case 1:
                return <p className="text-green-500 font-semibold">Vừa đặt hàng</p>
            case 2:
                return <p className="text-violet-800 font-semibold">Đang giao hàng</p>
            case 3:
                return <p className="text-blue-500 font-semibold">Đã nhận hàng</p>
            default:
                return <p className="text-red-500 font-semibold">Không nhận hàng</p>
        }
    }

    // const handleUpdateOrders = () => {
    //     axios.post('https://lapcenter-v1.onrender.com/api/order/addOrder', {
    //         customerName: name,
    //         phone: phone,
    //         address: address,
    //         productName: ordersInfo?.name || ordersInfo?.productName,
    //         productBrand: ordersInfo?.brand || ordersInfo?.productBrand,
    //         quantity: quantity,
    //         orderStatus: 1
    //     })
    //         .then(function (response) {
    //             console.log(response);
    //             setIsOpen(false)
    //             toast.success('🦄 Update successfully!', {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",

    //             });
    //             localStorage.getItem('userId') && handleUpdateOrders()
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             setIsOpen(false)
    //             toast.error('🦄 Something went wrong with the system!', {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //             });
    //         });

    // }

    useEffect(() => {
        handleGetAllOrders()
    }, [])


    return (
        <div>
            <Navbar />
            {loading ? (<Loader />
            ) : (
                <div>
                    <p className="text-center my-5 font-semibold text-xl ">
                        Quản lý đơn hàng của  <span className="text-blue-700">{localStorage.getItem('name')}</span>
                    </p>
                    <div className="px-20">
                        <table class="table-fixed w-full mb-10 ">
                            <thead>
                                <tr className="text-left border-b-[1px] border-black">
                                    <th className="w-[50%]">Tên khách hàng</th>
                                    <th className="w-[70%]">Tên sản phẩm</th>
                                    <th className="w-[50%]">Số điện thoại </th>
                                    <th className="w-[70%]">Địa chỉ</th>
                                    <th className="w-[70%]">Trạng thái</th>

                                    <th className="w-[70%]">Thao tác</th>



                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item) => (
                                    <tr className="border-b-[1px] border-gray-300  ">
                                        <td className="py-2 font-semibold">
                                            {item?.customerName}
                                        </td>
                                        <td className="py-2">{item?.productName}</td>
                                        <td className="py-2">{item?.phone}</td>
                                        <td className="py-2 ">{item?.address
                                        } </td>
                                        <td className="py-2 ">{handleRenderStatus(item?.orderStatus)}</td>

                                        <td className="py-2 flex mt-4">
                                            <img
                                                className="w-[30px] cursor-pointer hover:scale-125"
                                                src={icondelete}
                                                alt=""

                                                onClick={() => { handleDeleteOrder(item?._id) }}


                                            />
                                            <img className="w-[35px] cursor-pointer hover:scale-125 mx-2"
                                                // onClick={handleOpenModal}
                                                onClick={()=> {
                                                    setsOpenViewOrder(true)
                                                    setOrderInfo(item)
                                                
                                                }}
                                                src={iconview} alt=""
                                            // onClick={() => navigate('/buy', { state: { ordersInfo: item } })}
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
            <UpdateOrderDialog isOpen={IsOpenViewOrder} 
            handleClose={handleCloseViewOrder} 
            orderInfo={orderInfo}
            handleRefeshGetAll={handleGetAllOrders}
            
            />
            {/* <Modal
                isOpen={IsOpen}
                //onAfterOpen={afterOpenModal}
                //onRequestClose={handleCloseModal}
                style={customStyles}
            //contentLabel="Example Modal"
            >
                <div className=" w-[700px]">
                    <div className="flex justify-between font-semibold text-blue-700 text-2xl">
                        <p> Xác nhận thông tin</p>
                        <p onClick={handleCloseModal}>
                            <img className="w-[30px] h-[30px]" src={iconclose} />
                        </p>

                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <div className="mt-3 w-[530px]">
                            <>
                                <p className="py-2">Tên khách hàng: <span>{name}</span></p>
                                <p className="py-2">
                                    Tên sản phẩm:{' '}
                                    <span className="font-semibold py-2">-------</span>
                                </p>
                                <p className="py-2">
                                    Hãng:{' '}
                                    <span className="font-semibold py-2">-------</span>
                                </p>
                                <p className="py-2">
                                    Số lượng: <span className="font-semibold py-2">----------</span>
                                </p>
                                <p className="py-2">
                                    Số điện thoại: <span className="font-semibold py-2">{ordersInfo?.phone}</span>
                                </p>
                                <p className="py-2">
                                    Địa chỉ: <span className="font-semibold py-2">------</span>
                                </p>

                                <p>
                                    Trạng thái: <span className="font-semibold"></span>
                                    <select name="" id="" className="border-[1px] border-gray-400 py-1 px-2 rounded w-[150px]"
                                    // onChange={(e) => handleFilterBrand(e.target.value)}
                                    >
                                        <option value=""> Vừa đặt hàng </option>
                                        <option value="">Đang giao hàng</option>
                                        <option value="">Đã nhận hàng</option>
                                        <option value="">Không nhận hàng</option>
                                    </select>
                                </p>



                            </>

                        </div>
                    </div>
                    <hr className="mt-3" />
                    <div className="flex ">
                        <div className="w-[100px] p-3  bg-green-500 rounded m-auto mr-4 hover:bg-green-700 cursor-pointer mt-3">
                            <p className="text-center  text-white font-bold">Cập nhật</p>

                        </div>
                        <div className="w-[100px] p-3  bg-gray-400 rounded  hover:bg-gray-600 cursor-pointer mt-3">
                            <p onClick={handleCloseModal} className="text-center  text-white font-bold">Huỷ</p>

                        </div>
                    </div>
                </div>



            </Modal> */}
        </div>

    )
}
export default Orders