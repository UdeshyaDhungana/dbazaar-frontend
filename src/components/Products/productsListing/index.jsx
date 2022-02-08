import React, { useState } from 'react';
import {
    Flex,
    Grid,
    useDisclosure
} from '@chakra-ui/react';

import ProductCard from './productCard';
import ProductModal from './productModal';


function ProductsListing({ products }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentProduct, setCurrentProduct] = useState(null);

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
                        onClick={() => {
                            setCurrentProduct(product);
                            onOpen();
                        }}
                        key={product.id}
                        product={product} />
                ))
                }
                <ProductModal
                    product={currentProduct}
                    isOpen={isOpen}
                    onClose={onClose} />
            </Grid>
        </Flex>
    );
}

export default ProductsListing;