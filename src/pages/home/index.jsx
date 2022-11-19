import React from "react";
import Navbar from "../../components/navbar";
import ProductCart from "../../components/product-card";


const Home =()=>{
    return(
        <div>
            <Navbar/>
            <h1 className="text-3xl font-bold underline">Home Page</h1>
            <ProductCart/>
        </div>
    )
}
export default Home