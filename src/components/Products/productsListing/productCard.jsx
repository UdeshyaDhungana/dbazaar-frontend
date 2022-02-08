import React from 'react';
import {
    Stack,
    Image,
    Heading,
    Box,
    Icon,
} from '@chakra-ui/react'

import { Star } from 'phosphor-react'
import { Link } from 'react-router-dom';

const ProductCard = ({ product: { id, label, price, description, stars }, detailed }) => {
    return (
        <Link to={`/products/${id}`}>
            <Stack
                _hover={!detailed ? {
                    boxShadow: "2xl"
                } : null}
                borderRadius={"xl"}
                cursor={"pointer"}
                p={{ base: "5px 2rem" }}>
                <Image
                    height={detailed?"sm":"inherit"}
                    width={detailed?"container.sm":"fit-content"}
                    alignSelf={"center"}
                    border={"1px"}
                    borderRadius={'xl'}
                    // objectFit="cover"
                    src={'https://picsum.photos/seed/picsum/200/300'}
                    alt={label} />
                <Heading color="gray.600" size="md" textTransform="capitalize">
                    {label}
                </Heading>
                <Box>
                    <Box as="span" color="gray.600" fontSize="sm">
                        Rs.&nbsp;
                    </Box>
                    {price}
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
                {detailed && <Box>
                    {description}
                </Box>}
                <Heading className="mt-4" size={"md"}>Ownership History</Heading>
            </Stack>
        </Link>
    )
}

export default ProductCard;