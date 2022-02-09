import React from 'react';
import {
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from '@chakra-ui/react'

function OwnershipHistory() {
    return (
        <Table variant="striped" colorScheme={'gray'}>
            <Thead>
                <Tr>
                    <Th>Bought By</Th>
                    <Th>Bought for</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Udeshya Dhungana</Td>
                    <Td>Rs. 100</Td>
                </Tr>
                <Tr>
                    <Td>Pranjal Pokharel</Td>
                    <Td>Rs. 200</Td>
                </Tr>
                <Tr>
                    <Td>Sandesh Ghimire</Td>
                    <Td>Rs. 350</Td>
                </Tr>
                <Tr>
                    <Td>Nisha Sharma</Td>
                    <Td>Rs. 500</Td>
                </Tr>
            </Tbody>
        </Table>
    );
}

export default OwnershipHistory;