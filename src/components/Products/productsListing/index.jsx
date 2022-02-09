import {
    Flex,
    Grid
} from '@chakra-ui/react';
import React from 'react';
import ProductCard from './productCard';

function ProductsListing({ products }) {

    return (
        <Flex
            direction="row"
            minH="100vh"
        >
            <Grid
                w="full"
                gridGap="10"
                gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )"
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product} />
                ))}
            </Grid>
        </Flex>
    );
}

export default ProductsListing;