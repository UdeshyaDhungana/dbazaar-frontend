import { Heading } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';

import { productsList } from '../components/Products';
import ProductsListing from '../components/Products/productsListing';

function BiddedProducts() {
    const user = useContext(UserContext)

    return (
        user ?
            <>
                <Heading size={"lg"}>My Bids</Heading>
                <ProductsListing
                    products={productsList} />
            </>
            : <Navigate to="/" />
    );
}

export default BiddedProducts;