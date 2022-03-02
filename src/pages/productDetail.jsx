import {
    Box, Heading, Text, useToast
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import Bids from '../components/Products/productDetails/bids';
import Comments from '../components/Products/productDetails/comments';
import ProductImage from '../components/Products/productDetails/productImage';
import { getSingleProuct } from '../services/productService';


function ProductDetail() {
    const user = useContext(UserContext);
    const { id } = useParams();
    const toast = useToast();

    const [productId, setProductId] = useState(0);
    const [label, setLabel] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');
    const [postedBy, setPostedBy] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [productOwnerId, setProductOwnerId] = useState(0);

    useEffect(() => {
        getSingleProuct(id)
            .then(({ data: { id, title, image, unit_price, description, owner, } }) => {
                setProductId(id);
                setLabel(title);
                setPrice(unit_price);
                setDescription(description);
                setPostedBy(`${owner.firstname} ${owner.lastname}`);
                setImageUrl(image);
                setProductOwnerId(owner.id);
            }).catch(_ => {
                window.location.href = '/not-found'
            })
    }, [id, toast]);

    return (
        <>
            <div className="grid my-10 md:grid-cols-2">
                <ProductImage className="justify-self-center" title={label} imageUrl={imageUrl} />
                <Box>
                    <Heading size={"lg"}>{label}</Heading>
                    <Text>By {postedBy}</Text>
                    <div className='mt-2'>Rs. {price}</div>
                    <div className='mt-3'>
                        {description}
                    </div>
                </Box>
            </div>
            {/* Only Authenticated Users can See ownership history */}
            {/* {user && <OwnershipHistory />} */}
            <div className='grid grid-cols-2 gap-4'>
                <Comments productId={productId} />
                {user && <Bids isOwner={user.user_id === productOwnerId} productId={productId} />}
            </div>
        </>
    )
}

export default ProductDetail;