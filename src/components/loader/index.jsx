import React from "react";
import HashLoader from 'react-spinners/HashLoader'

const Loader = ({ loading }) => {
    return( 
    <div className=" w-full h-screen flex items-center justify-center">
        <HashLoader color="green" loading={loading} />
    </div>
    )
}

export default Loader