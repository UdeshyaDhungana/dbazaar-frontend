import React from 'react';
// import { Select } from '@chakra-ui/react';

function ProductShowCase({ products }) {
    return ( 
        <div className=''>
            {products.map(product => (
                <div key={product.id}>
                    {product.id}
                    {product.name}
                    {product.price}
                    {product.description}
                    {product.stars}
                </div>
            ))}
        </div>
     );
}

function ProductsListing({ products }) {
    return (
        <div>
            {/* <Select placeholder='Sorty By'>
                <option value='price'>Price</option>
                <option value='a-z'>A-Z</option>
                <option value='z-a'>Z-A</option>
            </Select> */}
            {/* Show all | Auction | Buy now */}
            <ProductShowCase
                products={products}
            />
        </div>
    );
}

export default ProductsListing;