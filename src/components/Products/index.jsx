import React, { useEffect, useState } from 'react';
import Categories from './categories';
// import Filters from './filters';
import ProductsListing from './productsListing';

const productsList = [
    {
        id: 1,
        label: "Old Typewriter",
        price: 2000.00,
        description: "Very good! Been in my family since my grandfather's time.",
        stars: 4.5,
    },
    {
        id: 2,
        label: "Goldstar shoes",
        price: 3000.00,
        description: "OG gangsta shoes from Nepal.",
        stars: 4.0,
    },
    {
        id: 3,
        label: "Kitten",
        price: 2000.00,
        description: "Let's not talk about this",
        stars: 3.0,
    },
    {
        id: 4,
        label: "Plant pot",
        price: 200.00,
        description: "Used to get high with this",
        stars: 5.0,
    },
    {
        id: 5,
        label: "Lotion",
        price: 500.00,
        description: "( ͡° ͜ʖ ͡°)",
        stars: 5.0,
    },
    {
        id: 6,
        label: "Bonsai Tree",
        price: 20000.00,
        description: "Brought it from Japan. Stupid. No mangoes even in summer.",
        stars: 2.0,
    },
    {
        id: 7,
        label: "Makeup Brush",
        price: 800.00,
        description: "Got me 10 dates. None of them lasted. :(",
        stars: 4.2,
    },
    {
        id: 8,
        label: "Pencils",
        price: 120,
        description: "5 marks for extra good handwriting",
        stars: 4.5,
    }
]

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // to be replaced with api later
        setProducts(productsList);
    }, [])

    return ( 
        <div>
            <Categories />
            <div>
                {/* <Filters /> */}
                <ProductsListing
                    products={products}
                />
            </div>
        </div>
     );
}

export default Products;