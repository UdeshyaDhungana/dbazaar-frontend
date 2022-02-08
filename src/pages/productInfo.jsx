import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/Products/productsListing/productCard';
import { productsList } from '../components/Products';

function ProductInfo() {
    const { id } = useParams();

    const [productId, setProductId] = useState(0);
    const [label, setLabel] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState();

    useEffect(() => {
        setTimeout(() => {
            const { id: productId, label, price, description, stars } = productsList[id];
            console.log(productsList[id])
            setProductId(productId);
            setLabel(label);
            setPrice(price);
            setDescription(description);
            setStars(stars);
        }, 500);
    }, [id])

    return (
        <div className='my-4'>
            <ProductCard
                product={{
                    id: productId,
                    label,
                    price,
                    description,
                    stars,
                }}
                detailed />
        </div>
    );
}

export default ProductInfo;