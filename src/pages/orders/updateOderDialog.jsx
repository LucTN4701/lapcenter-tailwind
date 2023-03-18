import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { customStyles } from "../../constant/styleModal";
import toastMessage from "../../components/messages";



const UpdateOrderDialog = ({ isOpen, handleClose, orderInfo , handleRefeshGetAll}) => {

    const [orderStatus, setOrderStatus] = useState()

    useEffect(() => {
        setOrderStatus(orderInfo?.orderStatus)

    }, [orderInfo])

    const handleChangeOrderStatus = (val) => {
        setOrderStatus(val)

    }


    const handleUpdateOrderStatus = (orderId) => {
        axios.patch(`https://lapcenter-v1.onrender.com/api/order/editOrderStatus/${orderId}`, {
            orderStatus: orderStatus

        }).then(function (response) {
            console.log(response);
            toastMessage('success', 'Cap nhat thanh cong')
            // toast.success('😛 Cập nhật thành công', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored"

            // })
            handleClose()
            handleRefeshGetAll()
        })
            .catch(function (error) {
                console.log(error);
                toastMessage('error', 'Cập nhật thất bại, vui lòng thử lại')
                // toast.error('😐 Cập nhật thất bại, vui lòng thử lại', {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "colored"

                // })
                handleClose()


            });


    }
    return (

        <Modal
            isOpen={isOpen}
            style={customStyles}>
            <div className="w-[700px] h-[300px]">
                <p className="text-2xl text-blue-500 my-3 font-semibold"> Thông tin đơn hàng</p>
                <hr />
                <p className="mt-3">Tên khách hàng: <span className="font-semibold">{orderInfo?.customerName}</span></p>
                <p className="mt-3">Tên sản phẩm: <span className="font-semibold">{orderInfo?.productName}</span></p>
                <p className="mt-3">Hãng: <span className="font-semibold">{orderInfo?.productBrand}</span></p>
                <p className="mt-3">Số lượng: <span className="font-semibold">{orderInfo?.quantity}</span></p>
                <p className="mt-3">Số điện thoại: <span className="font-semibold">{orderInfo?.phone}</span></p>
                <p className="mt-3">Địa chỉ: <span className="font-semibold">{orderInfo?.address}</span></p>
                <div className="flex ">
                    <p className="mt-2 mr-2">Trạng thái đơn hàng </p>
                    <select name="" id="" className="border-[1px] border-gray-400 py-1 px-2 rounded w-[170px]"
                        onChange={(e) => handleChangeOrderStatus(e.target.value)}
                        value={orderStatus}
                    >
                        <option value={1}> Vừa đặt hàng </option>
                        <option value={2}>Đang giao hàng</option>
                        <option value={3}>Đã nhận hàng</option>
                        <option value={4}>Không nhận hàng</option>
                    </select>
                </div>

                <p className="cursor-pointer" onClick={handleClose}></p>
                <hr className="mt-3" />

                <div className="flex float-right w-[220px]">
                    <div
                        onClick={() => handleUpdateOrderStatus(orderInfo?._id)}
                        className="w-[100px] p-3 bg-green-500 rounded m-auto hover:bg-green-600 cursor-pointer mt-3"
                    >
                        <p className="text-center text-white font-bold">Cập nhật</p>
                    </div>
                    <div
                        // onClick={handleBuyProduct}
                        className="w-[100px] p-3 bg-neutral-400 rounded m-auto hover:bg-neutral-500 cursor-pointer mt-3"
                    >
                        <p onClick={handleClose} className="text-center text-white font-bold">Huỷ</p>
                    </div>
                </div>
            </div>
        </Modal >

    )
}
export default UpdateOrderDialog