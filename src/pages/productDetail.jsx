import { Badge, Box, Heading, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import Button from '../components/commons/atomic/button';
import unknownErrorToast from '../components/commons/atomic/unknownErrorToast';
import Bids from '../components/Products/productDetails/bids';
import Comments from '../components/Products/productDetails/comments';
import ProductImage from '../components/Products/productDetails/productImage';
import { deleteProduct, getSingleProuct } from '../services/productService';


function ProductDetail() {
    const user = useContext(UserContext);
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onClose, onOpen } = useDisclosure();

    const [productId, setProductId] = useState(0);
    const [label, setLabel] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');
    const [postedBy, setPostedBy] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [productOwnerId, setProductOwnerId] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getSingleProuct(id)
            .then(({ data: { id, visible, title, image, unit_price, description, owner, } }) => {
                setProductId(id);
                setLabel(title);
                setPrice(unit_price);
                setDescription(description);
                setPostedBy(`${owner.firstname} ${owner.lastname}`);
                setImageUrl(image);
                setProductOwnerId(owner.id);
                setVisible(visible);
            }).catch(_ => {
                window.location.href = '/not-found'
            })
    }, [id, toast]);

    const handleDeleteProduct = (id) => {
        deleteProduct(id)
            .then(_ => {
                onClose();
                navigate('/');
            })
            .catch(_ => {
                unknownErrorToast(toast);
            })
    }

    return (
        <>
            <div className="grid my-10 md:grid-cols-2">
                <ProductImage className="justify-self-center" title={label} imageUrl={imageUrl} />
                <Box>
                    <Heading size={"lg"}>{label}  {!visible && <Badge>Unlisted</Badge>}</Heading>
                    {(user && user.user_id === productOwnerId) &&
                        <Button onClick={onOpen} className={'my-2'} danger>
                            Delete
                        </Button>}
                    <Text>By {postedBy}</Text>
                    <div className='mt-2'>Rs. {price}</div>
                    <div className='mt-3'>
                        {description}
                    </div>
                </Box>
            </div>
            {/* Only Authenticated Users can See ownership history */}
            {/* {user && <OwnershipHistory />} */}
            <div className={`grid ${user?'grid-cols-2':''} gap-8`}>
                <Comments productId={productId} />
                {user && <Bids visible={visible} isOwner={user.user_id === productOwnerId} productId={productId} />}
            </div>
            <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Confirm</ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter justifyContent={'center'}>
                        <Button filled danger onClick={() => handleDeleteProduct(productId)}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProductDetail;