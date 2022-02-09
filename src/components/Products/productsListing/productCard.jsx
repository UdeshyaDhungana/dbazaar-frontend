import React from 'react';
import {
    Stack,
    Image,
    Heading,
    Box,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom';
import ReviewStars from '../../commons/reviewStars';

const ProductCard = ({ product: { id, label, price, stars } }) => {
    return (
        <Link to={`/products/${id}`}>
            <Stack
                _hover={{
                    boxShadow: "2xl"
                }}
                borderRadius={"xl"}
                cursor={"pointer"}
                p={{ base: "5px 2rem" }} fontFamily='Inter'>
                <Image
                    width={"fit-content"}
                    alignSelf={"center"}
                    border={"1px"}
                    borderRadius={'xl'}
                    // objectFit="cover"
                    src={'https://picsum.photos/seed/picsum/200/300'}
                    alt={label} />
                <Heading fontFamily='Inter' color="brandGray.300" size="md" textTransform="capitalize">
                    {label}
                </Heading>
                <Box>
                    <Box as="span"color="brandGray.100" fontSize="sm" fontFamily='Inter'>
                        Rs.&nbsp;
                    </Box>
                    {price}
                </Box>
                <ReviewStars stars={stars} />
            </Stack>
        </Link>
    )
}

export default ProductCard;