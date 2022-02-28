import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading, Icon, Input, InputGroup, InputRightAddon, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter, ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper, Table, Tbody, Td, Text, Textarea, Th, Thead, Tr, useDisclosure, useToast
} from '@chakra-ui/react';
import { ChatText, X } from 'phosphor-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import Button from '../components/commons/atomic/button';
import OwnershipHistory from '../components/ownershipHistory';
import ProductImage from '../components/Products/productDetails/index';
import { getSingleProuct } from '../services/productService';

function ProductDetail() {
    const user = useContext(UserContext);
    const { id } = useParams();
    const toast = useToast();

    const { isOpen: isBidFormOpen, onOpen: onBidFormOpen, onClose: onBidFormClose } = useDisclosure();

    const [productId, setProductId] = useState(0);
    const [label, setLabel] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');
    const [postedBy, setPostedBy] = useState('');
    const [bids, setBids] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        getSingleProuct(id)
            .then(({ data: { id, title, image, unit_price, description, owner: { firstname, lastname } } }) => {
                setProductId(id);
                setLabel(title);
                setPrice(unit_price);
                setDescription(description);
                setPostedBy(`${firstname} ${lastname}`);
                setBids([])
                setImageUrl(image)
            }).catch(ex => {
                console.log(ex);
                // window.location.href = '/not-found'
            })
    }, [id, toast]);

    const handlePlaceBid = (bidPrice, description) => {
        console.log(bidPrice)
        console.log(description);
        // close modal dialog after submission
    }

    return (
        <>
            <div className="grid my-10 md:grid-cols-2">
                <ProductImage className="justify-self-center" title={label} imageUrl={imageUrl} />
                <Box>
                    <Heading size={"lg"}>{label}</Heading>
                    <Text>By {postedBy}</Text>
                    <div className='mt-2'>Rs. {price}</div>
                    <Button disabled={!user} className="mt-3" onClick={onBidFormOpen}>Place Bid</Button>
                    <ProductBidForm
                        isOpen={isBidFormOpen}
                        handlePlaceBid={handlePlaceBid}
                        onClose={onBidFormClose} />
                    <div className='mt-3'>
                        {description}
                    </div>
                </Box>
            </div>
            {user && <OwnershipHistory />}
            {bids.length > 0 && <BidList className="mb-4" bids={bids} />}
            <Comments product={productId} />
        </>
    )
}

const commentsList = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis fringilla aliquam. ",
        postedBy: {
            id: 1,
            name: "Mao Ze"
        },
        replies: []
    },
    {
        id: 2,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis fringilla aliquam. ",
        postedBy: {
            id: 2,
            name: "Deng Xi"
        },
    },
    {
        id: 3,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis fringilla aliquam. ",
        postedBy: {
            id: 4,
            name: "Hu Lu"
        },
        replies: []
    },
]


function Comments({ productId }) {
    const [comments, setComments] = useState([]);

    const { onClose, onOpen, isOpen } = useDisclosure();

    const [postComment, setPostComment] = useState("");

    useEffect(() => {
        setComments(commentsList);
        // Later we'll fetch and display
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postComment);
    }

    return (
        <>
            <Heading className='mb-2' size={"lg"}>Comments</Heading>
            {comments.map(({ id, text, postedBy, replies }) => (
                <div className='my-3' key={id}>
                    <div className='mt-3'>
                        <Text fontWeight={"extrabold"}>{postedBy.name}</Text>
                        <Text>{text}</Text>
                    </div>
                    {/* {replies.map(({ id, text: replyText, postedBy }) => (
                        <div key={id} className='ml-7 my-3'>
                            <Text fontWeight={"semibold"}>{postedBy.name}</Text>
                            <Text>{replyText}</Text>
                        </div>
                    ))} */}
                </div>
            ))}
            <Button onClick={onOpen} leftIcon={<ChatText />}>Comment</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit} >
                        <ModalHeader>Post a Comment</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel htmlFor='comment'>Comment</FormLabel>
                                <InputGroup>
                                    <Input
                                        value={postComment}
                                        onChange={({ target: { value } }) => setPostComment(value)}
                                        id='comment' />
                                    <InputRightAddon
                                        bg={'brandGray.200'}
                                        onClick={() => setPostComment("")}
                                        className='cursor-pointer'>
                                        <Icon as={X} color={"brandGray.100"} />
                                    </InputRightAddon>
                                </InputGroup>
                                <FormHelperText>Maximum 255 Characters</FormHelperText>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" filled>Post</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}


function BidList({ bids, className }) {
    const { isOpen: isBidDetailOpen, onOpen: onBidDetailOpen, onClose: onBidDetailClose } = useDisclosure();

    const [currentBid, setCurrentBid] = useState(bids[0]);

    const handleBidApproval = () => {
        console.log('approved')
    }
    return (
        <div className={className}>
            <Heading size={"lg"} className='mb-2'>Placed Bids</Heading>
            <Table variant={"striped"} size='sm'>
                <Thead>
                    <Tr>
                        <Th>Posted By</Th>
                        <Th isNumeric>Bid Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {bids.map((bid) => (
                        <Tr key={bid.id} onClick={() => {
                            setCurrentBid(bid);
                            onBidDetailOpen();
                        }} className='cursor-pointer'>
                            <Td>{bid.posted_by.name}</Td>
                            <Td isNumeric>{bid.price}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Modal isOpen={isBidDetailOpen} onClose={onBidDetailClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{currentBid.posted_by.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading className='mb-4' size={'sm'}>Rs. {currentBid.price}</Heading>
                        {currentBid.description}
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={handleBidApproval}>
                            Approve Bid
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

const ProductBidForm = ({ isOpen, onClose, handlePlaceBid }) => {
    const [bidPrice, setBidPrice] = useState(0);
    const [bidPriceError, setBidPriceError] = useState("");

    const [description, setDescription] = useState("");

    const isBidPriceInvalid = () => {
        return bidPrice < 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isBidPriceInvalid()) {
            setBidPriceError("Please enter a non negative value")
        } else {
            setBidPriceError("");
            handlePlaceBid(bidPrice, description);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <ModalHeader>Place Your Bid</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel htmlFor='bid-price'>Bid Price</FormLabel>
                            <NumberInput clampValueOnBlur>
                                <NumberInputField
                                    min={0}
                                    id={'bid-price'}
                                    value={bidPrice}
                                    onChange={({ target: { value } }) => {
                                        setBidPrice(value);
                                    }}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            {bidPriceError && <FormHelperText color={"crimson"}>
                                {bidPriceError}
                            </FormHelperText>}
                        </FormControl>
                        <FormControl className='mt-3' htmlFor='bid-description'>
                            <FormLabel htmlFor='bid-description'>
                                Bid Description
                            </FormLabel>
                            <Textarea
                                resize={'none'}
                                id={'bid-description'}
                                value={description}
                                onChange={({ target: { value } }) => { setDescription(value) }}
                                placeholder='Why do you think your bid is valid?' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit">
                            Place Bid
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal >
    )
}

export default ProductDetail;