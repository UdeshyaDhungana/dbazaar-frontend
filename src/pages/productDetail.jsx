import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Image, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper, Table, Tbody, Td, Text, Th,
    Textarea, Thead, Tr, useDisclosure
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import Button from '../components/commons/atomic/button';
import ReviewStars from '../components/commons/reviewStars';
import OwnershipHistory from '../components/ownershipHistory';
import { productsList } from '../components/Products';

function ProductDetail() {
    const user = useContext(UserContext);
    const { id } = useParams();

    const { isOpen: isBidFormOpen, onOpen: onBidFormOpen, onClose: onBidFormClose } = useDisclosure();

    const [productId, setProductId] = useState(0);
    const [label, setLabel] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState();
    const [postedBy, setPostedBy] = useState('');
    const [bids, setBids] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const { id: productId, label, price, description, stars, posted_by, bids } = productsList[Number(id) - 1];
            setProductId(productId);
            setLabel(label);
            setPrice(price);
            setDescription(description);
            setStars(stars);
            setPostedBy(posted_by['name'])
            setBids(bids)
        }, 500);
    }, [id]);

    const handlePlaceBid = (bidPrice, description) => {
        console.log(bidPrice)
        console.log(description);
        // close modal dialog after submission
    }

    return (
        !isNaN(id) && Number.isInteger(Number(id)) && id > 0 ?
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
                <OwnershipHistory />
                {bids.length > 0 && <BidList bids={bids} />}
            </> : <Navigate to="/" />
    )
}

function BidList({ bids }) {
    const { isOpen: isBidDetailOpen, onOpen: onBidDetailOpen, onClose: onBidDetailClose } = useDisclosure();

    const [currentBid, setCurrentBid] = useState(bids[0]);

    const handleBidApproval = () => {
        console.log('approved')
    }
    return (
        <>
            <Heading className='mb-2'>Placed Bids</Heading>
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
        </>
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