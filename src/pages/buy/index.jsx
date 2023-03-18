import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Modal from "react-modal";
import iconclose from "../../assets/image/iconclose.png";
import "./styles.css";
import axios from "axios";
import { toast } from "react-toastify";
import { customStyles } from "../../constant/styleModal";
import Input from "../../components/input";
import Button from "../../components/button";

const Buy = () => {
  const { state } = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [IsOpen, setIsOpen] = React.useState(false);

  const productInfo = state?.productInfo;

  const handleChange = (val, field) => {
    switch (field) {
      case "name":
        setName(val);
        break;
      case "email":
        setEmail(val);
        break;
      case "phone":
        setPhone(val);
        break;
      case "address":
        setAddress(val);
        break;

      default:
        break;
    }
  };

  const handleChangeQuantity = (val) => {
    // if (val === '') {
    //     setQuantity(1)
    // }
    // if (val > 0) {
    //     setQuantity(val)
    // } else setQuantity(1)
    if (val < 0) {
      setQuantity(1);
    } else setQuantity(val);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleAddProductInHistory = () => {
    axios
      .post(
        "https://lapcenter-v1.onrender.com/api/history/addProductToHistory",
        {
          userId: localStorage.getItem("userId"),
          phone: phone,
          address: address,
          productName: productInfo?.name || productInfo?.productName,
          productBrand: productInfo?.brand || productInfo?.productBrand,
          quantity: quantity,
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleBuyProduct = () => {
    axios
      .post("https://lapcenter-v1.onrender.com/api/order/addOrder", {
        customerName: name,
        email: email,
        phone: phone,
        address: address,
        productName: productInfo?.name || productInfo?.productName,
        productBrand: productInfo?.brand || productInfo?.productBrand,
        quantity: quantity,
        orderStatus: 1,
      })
      .then(function (response) {
        console.log(response);
        setIsOpen(false);
        toast.success("🦄 Add successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        localStorage.getItem("userId") && handleAddProductInHistory();
      })
      .catch(function (error) {
        console.log(error);
        setIsOpen(false);
        toast.error("🦄 Something went wrong with the system!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  useEffect(() => {
    if (!name || !email || !phone || !address || parseInt(quantity) === 0) {
      setIsDisabled(true);
    }
    if (name && email && phone && address && quantity > 0) {
      setIsDisabled(false);
    }
  }, [name, email, phone, address, quantity]);

  const incrementQuantity = () => {
    setQuantity(parseInt(quantity) + 1);
  };

  const decrementQuantity = () => {
    if (parseInt(quantity) > 1) {
      setQuantity(parseInt(quantity) - 1);
    } else {
      setQuantity(1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-20 py-5">
        <div className="px-40 ">
          <p className="mb-4">
            <span className="text-red-600 font-bold">Để đặt hàng,</span> quý
            khách hàng vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc và
            điền các thông tin dưới đây:
          </p>

          <div className="flex justify-between">
            <img
              src={productInfo?.image || productInfo?.images[0]}
              alt=""
              className="w-[100px] h-[70px]"
            />
            <p className="font-bold">
              {productInfo?.productName || productInfo?.name}
            </p>
            <div className="flex justify-between">
              <p
                className="bg-gray-300 w-[35px] h-[35px] text-center hover:bg-gray-500 cursor-pointer"
                onClick={decrementQuantity}
              >
                -
              </p>
              <input
                type="number"
                name=""
                value={quantity}
                onChange={(e) => handleChangeQuantity(e.target.value)}
                className="w-[50px] h-[35px] border-[1px] border-gray-500 mx-2 rounded outline-none px-2 hide_input"
              />
              <p
                className="bg-gray-300 w-[35px] h-[35px] text-center hover:bg-gray-500 cursor-pointer"
                onClick={incrementQuantity}
              >
                +
              </p>
            </div>
          </div>
          <p className="text-right my-3 font-semibold text-blue-500">
            Giá: {productInfo?.price}
          </p>
          <hr />
          <p className="text-2xl font-semibold text-red-500 text-right">
            Tổng tiền: {quantity * productInfo?.price} VND
          </p>

          <div className=" w-full h-[500px] p-10 rounded-2xl shadow-lg shadow-gray-500/50 my-6">
            <p className="text-center font-bold text-green-500 text-2xl">
              Thông tin người nhận
            </p>
            <p>
              Tên người nhận <span className="text-red-700">*</span>
            </p>
            <Input
              type={"text"}
              value={name}
              handleChange={handleChange}
              placeholder={"Tên người nhận"}
              className={
                "border-gray-500 border-[1px] w-full mb-3 mt-1 px-2 outline-none rounded"
              }
              field={"name"}
            />
            {/* <input
              type="text"
              value={name}
              onChange={(e) => handleChange(e.target.value, "name")}
              placeholder="Tên người nhận"
              className="border-gray-500 border-[1px] w-full mb-3 mt-1 px-2 outline-none rounded"
            /> */}
            <p>
              Email <span className="text-red-700">*</span>
            </p>
            <Input
              type={"text"}
              value={email}
              handleChange={handleChange}
              placeholder={"Email"}
              className={
                "border-gray-500 border-[1px] w-full mb-3 mt-1 px-2 outline-none rounded"
              }
              field={"email"}
            />
            {/* <input
              type="text"
              value={email}
              onChange={(e) => handleChange(e.target.value, "email")}
              placeholder="Email"
              className="border-gray-500 border-[1px] w-full mb-3 mt-1 px-2 outline-none rounded"
            /> */}
            <p>
              Số điện thoại <span className="text-red-700">*</span>
            </p>
            <Input
              type={"text"}
              value={phone}
              handleChange={handleChange}
              placeholder={"Số điện thoại"}
              className={
                "border-gray-500 border-[1px] w-full mb-3 mt-1 px-2 outline-none rounded"
              }
              field={"phone"}
            />
            {/* <input
              type="text"
              value={phone}
              onChange={(e) => handleChange(e.target.value, "phone")}
              placeholder="Số điện thoại"
              className="border-gray-500 border-[1px] w-full mb-3 mt-1 px-2 outline-none rounded"
            /> */}
            <p>
              Địa chỉ nhận hàng <span className="text-red-800">*</span>
            </p>
            <Input
              type={"text"}
              value={address}
              handleChange={handleChange}
              placeholder={"Địa chỉ nhận hàng"}
              className={
                "border-gray-500 border-[1px] w-full mb-3 mt-1 px-2 outline-none rounded"
              }
              field={"address"}
              isTextarea={true}
              rows={3}
            />
            {/* <textarea
              type="text"
              rows={3}
              value={address}
              onChange={(e) => handleChange(e.target.value, "address")}
              placeholder="Địa chi "
              className="border-gray-500 border-[1px] w-full mb-3 mt-1 px-2 outline-none rounded"
            /> */}

            <Button
              handleCLick={!isDisabled && handleOpenModal}
              className={`w-[100px] p-3 m-auto `}
              btnText={'Đặt hàng'}
              textStyles={"text-center text-black font-bold"}
              isDisable={isDisabled}
              type={'primary'}
            />
            {/* <div
              onClick={!isDisabled && handleOpenModal}
              className={`w-[100px] p-3 bg-green-400 rounded m-auto ${
                isDisabled
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "hover:bg-emerald-600 cursor-pointer"
              }`}
            >
              <p className="text-center text-black font-bold">Đặt hàng</p>
            </div> */}
            <div>
              <button
                onClick={() => {
                  toast.success("🦄 Wow so easy!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                }}
              ></button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={IsOpen}
        //onAfterOpen={afterOpenModal}
        //onRequestClose={handleCloseModal}
        style={customStyles}
        //contentLabel="Example Modal"
      >
        <div className=" w-[700px]">
          <div className="flex justify-between font-semibold text-blue-700 text-xl">
            <p> Xác nhận thông tin</p>
            <p onClick={handleCloseModal}>
              <img className="w-[30px] h-[30px]" src={iconclose} />
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <img
              className="w-[150px] h-[110px]"
              src={productInfo?.image || productInfo?.images[0]}
              alt=""
            />
            <div className="mt-3 w-[530px]">
              <>
                <p className="text-xl font-semibold">Thông tin sản phẩm</p>
                <p>
                  Tên sản phẩm:{" "}
                  <span className="font-semibold">
                    {productInfo?.productName || productInfo?.name}
                  </span>
                </p>
                <p>
                  Hãng:{" "}
                  <span className="font-semibold">{productInfo?.brand}</span>
                </p>
                <p>
                  Số lượng: <span className="font-semibold">{quantity}</span>
                </p>
                <p>
                  Tổng thanh toán:{" "}
                  <span className="font-semibold text-red-600">
                    {quantity * productInfo?.price} VND
                  </span>
                </p>
              </>
              <>
                <p className="text-xl font-semibold mt-3">
                  Thông tin khách hàng
                </p>
                <p>
                  Tên khách hàng: <span className="font-semibold">{name}</span>
                </p>
                <p>
                  Số điện thoại: <span className="font-semibold">{phone}</span>
                </p>
                <p>
                  Email: <span className="font-semibold">{email}</span>
                </p>
                <p>
                  Địa chỉ: <span className="font-semibold">{address}</span>
                </p>
              </>
            </div>
          </div>
          <hr className="mt-3" />

          <Button
            handleClick={handleBuyProduct}
            className={
              "w-[100px] p-3 m-auto  mt-3"
            }
            textStyles={"text-center text-white font-bold"}
            btnText={"Mua hàng"}
            type={'primary'}
          />
          {/* <div
            onClick={handleBuyProduct}
            className="w-[100px] p-3 bg-green-500 rounded m-auto hover:bg-green-600 cursor-pointer mt-3"
          >
            <p className="text-center text-white font-bold">Mua hàng</p>
          </div> */}
        </div>
      </Modal>
    </div>
  );
};
export default Buy;
