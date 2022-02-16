import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import { Navigate } from 'react-router-dom';

import { productsList } from '../components/Products'
import { useEffect } from 'react';

import ProductsListing from '../components/Products/productsListing';


function MyProductListing() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(productsList);
    }, [])

    return (
        <ProductsListing products={products} />
    );
}

function MyProducts() {
    const user = useContext(UserContext)
    return (user ?
        <MyProductListing />
        : <Navigate to="/" />)
}

export default MyProducts;