import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';


function BiddedProducts() {
    const user = useContext(UserContext)

    return (
        // user ?
        //     <>
        //         <Heading size={"lg"}>My Bids</Heading>
        //         <ProductsListing
        //             products={productsList} />
        //     </>
        //     :
        <Navigate to="/" />
    );
}

export default BiddedProducts;