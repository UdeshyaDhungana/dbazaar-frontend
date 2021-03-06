import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import { Navigate } from 'react-router-dom';

import { useEffect } from 'react';

import ProductsListing from '../components/Products/productsListing';
import { Heading } from '@chakra-ui/react';


function MyProductListing() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts([]);
    }, [])

    return (
        <ProductsListing products={products} />
    );
}

function MyProducts() {
    const user = useContext(UserContext)
    return (
        // user ?
        // <>
        // <Heading size={"lg"}>My Products</Heading>
        // <MyProductListing />
        // </>
        // :
        <Navigate to="/" />
    )
}

export default MyProducts;