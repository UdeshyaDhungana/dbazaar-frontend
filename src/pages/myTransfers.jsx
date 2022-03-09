import { Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Button from '../components/commons/atomic/button';
import unknownErrorToast from '../components/commons/atomic/unknownErrorToast';
import { approveTransfer, getMyTransfers } from '../services/transferService';

function MyTransfers() {

    const user = useContext(UserContext);

    const [outgoingTransfers, setOutgoingTransfers] = useState([]);
    const [incomingTransfers, setIncomingTransfers] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        // Fetch transfers
        getMyTransfers()
            .then(({ data }) => {
                setOutgoingTransfers(data.filter(trans => trans.seller.id === user.user_id))
                setIncomingTransfers(data.filter(trans => trans.buyer.id === user.user_id))
            })
            .catch(_ => {
                console.log('User is absent')
            })
    }, [toast, user])

    const handleTransferApproval = (id) => {
        approveTransfer(id)
        .then(({ data: {id} }) => {
            toast({
                title: "Success",
                description: "The product is now yours!",
                duration: 4000,
                isClosable: false,
                status: 'success',
            })
            navigate(`/products/${id}`);
        })
        .catch(_ => {
            unknownErrorToast(toast);
        })
    }

    return (
        user ?
            <>
                <Tabs>
                    <TabList>
                        <Tab>Outgoing Transfers</Tab>
                        <Tab>Incoming Transfers</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <p className='mb-4 font-bold'>After buyer approves transfer, the ownership will be transferred.</p>
                            {outgoingTransfers.length > 0 ?
                                outgoingTransfers.map(transfer => <Transfer outgoing key={transfer.id} transfer={transfer} />)
                                :
                                <div>Nothing to see here!</div>
                            }
                        </TabPanel>
                        <TabPanel>
                            <p className='mb-4 font-bold'>
                                Approve the transfers to obtain products' ownership.
                            </p>
                            {incomingTransfers.length > 0 ?
                                incomingTransfers.map(transfer => <Transfer handleTransferApproval={handleTransferApproval} key={transfer.id} transfer={transfer} />)
                                :
                                <div>Nothing to see here!</div>
                            }
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </>
            :
            <Navigate to={'/'} />
    );
}

function Transfer({ transfer: { buyer, product: { title }, seller, completed, id }, handleTransferApproval, outgoing }) {

    const getFullName = ({ firstname, lastname }) => {
        return `${firstname} ${lastname}`;
    }
    return (
        <div className='mb-6'>
            <p>
                Product: {title}
            </p>
            <p>
                Seller: {getFullName(seller)}
            </p>
            <p>
                Buyer: {getFullName(buyer)}
            </p>
            <p>
                Status: {completed ? '' : 'Pending'}
            </p>
            {!outgoing && <Button
                onClick={() => { handleTransferApproval(id) }}
                className={'mt-3'}>
                Approve Transfer
            </Button>}
        </div>
    )
}

export default MyTransfers;