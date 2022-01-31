import React from 'react';
import { Box, Image, Flex, Grid, Stack, Text, Heading, Icon } from '@chakra-ui/react';
import { Star } from 'phosphor-react';

// Sample card from Airbnb

const ProductCard = ({ product: { id, label, price, description, stars } }) => {
    return (
        <Stack p={{ base: "0 2rem" }} fontFamily='Inter'>
            <Image marginBottom='1em' borderRadius={'2xl'} objectFit="cover" src={'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            } alt={'ITEMNAME'} />
            <Heading fontFamily='Inter' color="brandGray.300" size="md" textTransform="capitalize">
                {label}
            </Heading>
            <Text fontFamily='Inter' color="brandGray.100" isTruncated>
                {description}
            </Text>
            <Box>
                <Box as="span" color="brandGray.100" fontSize="sm">
                    <Heading fontSize='1.25em' fontFamily='Inter'>
                    Rs.&nbsp;{price}
                    </Heading>
                </Box>
            </Box>
            <Box display='flex' mt='2' alignItems='center'>
                {Array(5)
                    .fill('')
                    .map((_, i) => (
                        <Icon
                            as={Star}
                            key={i}
                            weight={i < stars ? 'fill' : 'regular'}
                            color={'orange.300'}
                        />
                    ))}
            </Box>
        </Stack>
    )
}


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
                    <ProductCard key={product.id} product={product} />
                ))}
            </Grid>
        </Flex>
    );
}

export default ProductsListing;