import React from "react";
import { toast } from 'react-toastify';

const animation = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"


}

export const toastMessage = (status, msg) => {
    switch (status) {
        case 'success':
            toast.success(msg, animation)
            break;
        case 'error':
            toast.error(msg, animation)
            break;
        case 'info':
            toast.info(msg, animation)
            break;
        default:
            toast.warning(msg, animation)
            break;
    }

    // if(status==='success'){
    //     toast.success('😛 Cập nhật thành công', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored"

    //     })

    // }

}
export default toastMessage