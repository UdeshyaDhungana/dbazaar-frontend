import React from 'react';
import {
    Stack,
    Image,
    Heading,
    Box,
    Center,
    useColorModeValue,
    Text,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom';

const IMAGE = 'https://picsum.photos/id/237/200/300'

function ProductCard({ product: { id, label, price, description, category, posted_by } }) {
    return (
        <Center py={12}>
            <Link to={`/products/${id}`}>
                <Box
                    role={'group'}
                    className="cursor-pointer"
                    p={6}
                    maxW={'330px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    zIndex={1}
                    pos={'relative'}>
                    <Box
                        rounded={'lg'}
                        mt={-12}
                        pos={'relative'}
                        height={'230px'}
                        _after={{
                            transition: 'all .3s ease',
                            content: '""',
                            w: 'full',
                            h: 'full',
                            pos: 'absolute',
                            top: 5,
                            left: 0,
                            backgroundImage: `url(${IMAGE})`,
                            filter: 'blur(15px)',
                            zIndex: -1,
                        }}
                        _groupHover={{
                            _after: {
                                filter: 'blur(20px)',
                            },
                        }}>
                        <Image
                            rounded={'lg'}
                            height={230}
                            width={282}
                            objectFit={'cover'}
                            src={IMAGE}
                        />
                    </Box>
                    <Stack pt={10} align={'center'}>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            {category.label}
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            {label}
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                                Rs. {price}
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Link>
        </Center>
    );
}

export default ProductCard;