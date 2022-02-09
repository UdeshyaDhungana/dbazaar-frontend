import { Box, Heading, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewStars from '../components/commons/reviewStars';
import { productsList } from '../components/Products';
import OwnershipHistory from '../components/ownershipHistory';

function ProductDetail() {
    const { id } = useParams();

    const [productId, setProductId] = useState(0);
    const [label, setLabel] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState();
    const [postedBy, setPostedBy] = useState('');

    useEffect(() => {
        setTimeout(() => {
            const { id: productId, label, price, description, stars, posted_by } = productsList[id];
            console.log(productsList[id])
            setProductId(productId);
            setLabel(label);
            setPrice(price);
            setDescription(description);
            setStars(stars);
            setPostedBy(posted_by['name'])
        }, 500);
    }, [id])

    return (
        <>
            <div className="grid my-10 md:grid-cols-2">
                <Box className='justify-self-center'>
                    <Image
                        src={'https://picsum.photos/seed/picsum/200/300'}
                        className=""
                    />
                </Box>
                <Box>
                    <Heading>{label}</Heading>
                    <Text>By {postedBy}</Text>
                    <ReviewStars className={'mt-2'} stars={stars} />
                    <div className='mt-2'>Rs. {price}</div>
                    <div className='mt-3'>
                        {description}
                    </div>
                </Box>
            </div>
            <div>
                <Heading className='mb-3'>Ownership History</Heading>
                <OwnershipHistory />
            </div>
        </>
    );
}

export default ProductDetail;