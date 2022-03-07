import React, { useEffect, useState } from 'react';
import ProductsListing from './productsListing';
import { getProducts } from '../../services/productService';
import { useToast } from '@chakra-ui/react';
import { SmileySad } from 'phosphor-react';

function Products() {
    const [products, setProducts] = useState([]);
    const toast = useToast();
    const [pageNumber, setPageNumber] = useState(0);
    // const [filters, setFilters] = useState({});

    // const applyFilter = (filters) => {
    //     setFilters(filters);
    //     console.log(filters);
    // }

    useEffect(() => {
        getProducts()
        // fetch according to page
            .then(({ data: { results } }) => {
                setProducts(results);
            }).catch(_ => {
                toast({
                    title: "Error",
                    description: "Error occured while fetching categories",
                    duration: 4000,
                    status: "error",
                    isClosable: false,
                })
            })
    }, [toast])

    return (
        <div>
            {products.length > 0 ?
            //pages incrementor / decrementor
            <ProductsListing
                products={products}
            />
                :
                <div className='grid justify-center'>
                    <div className='justify-self-center'>
                        <SmileySad display={'block'} className='' size={64} />
                    </div>
                    <div className='align-center' >No products found!</div>
                </div>
            }
        </div>
        // </div>
    );
}

export default Products;