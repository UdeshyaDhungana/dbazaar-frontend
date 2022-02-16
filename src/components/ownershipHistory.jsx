import React from 'react';
import {
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Heading,
} from '@chakra-ui/react'

function OwnershipHistory() {
    return (
        <div className='mb-7'>
            <Heading className='mb-3'>Ownership History</Heading>
            <Table size={'sm'} variant="striped">
                <Thead>
                    <Tr>
                        <Th>Bought By</Th>
                        <Th isNumeric>Bought for</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Udeshya Dhungana</Td>
                        <Td isNumeric>Rs. 100</Td>
                    </Tr>
                    <Tr>
                        <Td>Pranjal Pokharel</Td>
                        <Td isNumeric>Rs. 200</Td>
                    </Tr>
                    <Tr>
                        <Td>Sandesh Ghimire</Td>
                        <Td isNumeric>Rs. 350</Td>
                    </Tr>
                    <Tr>
                        <Td>Nisha Sharma</Td>
                        <Td isNumeric>Rs. 500</Td>
                    </Tr>
                </Tbody>
            </Table>
        </div>
    );
}

export default OwnershipHistory;