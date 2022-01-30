import React from 'react';
import Categories from './categories';
import Filters from './filters';
import ProductsListing from './productsListing';

function Products() {
    return ( 
        <div>
            <Categories />
            <div className="grid grid-cols-2 gap-4 justify-center">
                <Filters />
                <ProductsListing />
            </div>
        </div>
     );
}

export default Products;