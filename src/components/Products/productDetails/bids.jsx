import {
    FormControl, FormHelperText, FormLabel, Heading, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField,
    NumberInputStepper, Table, Tbody,
    Td, Text, Textarea, Th, Thead,
    Tr, useDisclosure, useToast
} from '@chakra-ui/react';
import moment from 'moment';
import { SmileySad, Trash } from 'phosphor-react';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import { approveBidOfProduct, deleteBidOfProduct, getProductBids, postBidOnProduct } from '../../../services/productService';
import Button from '../../commons/atomic/button';
import unknownErrorToast from '../../commons/atomic/unknownErrorToast';
import { useNavigate } from 'react-router-dom';


function Bids({ productId, className, isOwner, visible }) {
    const user = useContext(UserContext);

    const [bids, setBids] = useState([]);
    const [openedBid, setOpenedBid] = useState({});
    const [reload, setReload] = useState(false);

    const { onOpen: onBidDetailOpen, isOpen: isBidDetailOpen, onClose: onBidDetailClose } = useDisclosure();

    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        productId && getProductBids(productId)
            .then(({ data }) => {
                setBids(data);
            })
            .catch(_ => {
                unknownErrorToast(toast)
            })
    }, [productId, toast, reload]);

    const handleBidSubmit = (bidPrice, description) => {
        const bid = {
            price: bidPrice,
            description,
        }
        postBidOnProduct(productId, bid)
            .then(_ => {
                setReload(!reload);
                toast({
                    title: "Success!",
                    description: "Bid added successfully",
                    duration: 4000,
                    isClosable: false,
                    status: "success",
                });
            })
            .catch(_ => {
                unknownErrorToast(toast);
            })
    }

    const handleBidApproval = (productId, openedBidId) => {
        console.log(productId)
        console.log(openedBidId)
        approveBidOfProduct(productId, openedBidId)
        .then(({ data }) => {
            console.table(data)
        })
        .catch(err => {
            unknownErrorToast(toast);
        })
    }


    const handleBidDelete = (id) => {
        deleteBidOfProduct(productId, id)
            .then(_ => {
                onBidDetailClose();
                toast({
                    title: "Bid deleted",
                    duration: 3000,
                    isClosable: false,
                    status: "info"
                })
                setReload(!reload);
            })
            .catch(_ => {
                console.log(_)
            })
    }

    const getFullName = ({ firstname, lastname }) => {
        return `${firstname} ${lastname}`;
    }

    return (
        <div className={className}>
            <Heading size={"lg"} className='mb-6'>Placed Bids</Heading>
            {bids.length > 0 ?
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Posted By</Th>
                            <Th>Bid Price</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {bids.map((bid) => (
                            <Tr key={bid.id}>
                                <Td>{bid.customer.firstname + ' ' + bid.customer.lastname}</Td>
                                <Td>Rs. {bid.price}</Td>
                                <Td isNumeric><Button onClick={() => {
                                    setOpenedBid(bid)
                                    onBidDetailOpen();
                                }}>View Details</Button></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                :
                <NoBids />
            }
            {/* Modal for viewing bid details */}
            {Object.keys(openedBid).length > 0 &&
                <Modal size={"xl"} isOpen={isBidDetailOpen} onClose={onBidDetailClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader fontSize={"2xl"} fontWeight={"bold"}>Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Heading marginY={"2"} fontSize={"xl"}>By {getFullName(openedBid.customer)}</Heading>
                            <Text>Price: {openedBid.price}</Text>
                            <Text>Placed on {moment(openedBid.date).format("ddd, MMMM YYYY")}</Text>
                            <Heading marginY={"3"} fontSize={"xl"}>Description</Heading>
                            <Text>{openedBid.description}</Text>
                        </ModalBody>
                        {<ModalFooter>
                            {/* Only if current bid belongs to current user */}
                            <Button
                                display={
                                    Object.keys(openedBid).length > 0 && openedBid.customer.id === user.user_id ? "inherit" : "none"
                                }
                                onClick={() => { handleBidDelete(openedBid.id) }}
                                danger
                                rightIcon={<Trash />}>
                                Delete
                            </Button>
                            {/* Only if the product belongs to current user */}
                            {isOwner && <Button
                                onClick={() => { handleBidApproval(productId, openedBid.id) }}
                                display={isOwner ? "inherit" : "none"} className={"ml-3"} filled>
                                Approve
                            </Button>}
                        </ModalFooter>}
                    </ModalContent>
                </Modal>}

            {/* Component for adding new bid */}
            {!isOwner && <ProductBidForm
                user={user}
                visible={visible}
                handlePlaceBid={handleBidSubmit} />}
        </div>
    );
}

const ProductBidForm = ({ handlePlaceBid, visible }) => {
    const [bidPrice, setBidPrice] = useState(0);
    const [bidPriceError, setBidPriceError] = useState("");
    const [description, setDescription] = useState("");
    const { onOpen: onBidFormOpen, isOpen: isBidFormOpen, onClose: onBidFormClose } = useDisclosure();

    const isBidPriceInvalid = () => {
        return !bidPrice ? "Please enter a value" : bidPrice < 0 ? "Invalid value" : "";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const invalid = isBidPriceInvalid();
        if (invalid) {
            setBidPriceError(invalid);
        } else {
            setBidPriceError("");
            setBidPrice(0);
            setDescription("");
            onBidFormClose();
            handlePlaceBid(bidPrice, description);
        }
    }

    const clearForm = () => {
        setBidPrice(0);
        setBidPriceError("");
        setDescription("");
    }

    return (
        <>
            <Button
                disabled={!visible}
                onClick={onBidFormOpen}
                filled
                className="mt-3">
                Add Bid
            </Button>
            <Modal isOpen={isBidFormOpen} onClose={onBidFormClose}>
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
                            <Button className="mr-3" onClick={clearForm}>
                                Clear
                            </Button>
                            <Button filled type="submit">
                                Place Bid
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >
        </>
    )
}

function NoBids() {
    return (
        <div className='grid justify-center'>
            <div className='justify-self-center'>
                <SmileySad display={'block'} weight={"thin"} className='' size={64} />
            </div>
            <div className='align-center' >No bids have been placed yet!</div>
        </div>
    );
}


export default Bids;