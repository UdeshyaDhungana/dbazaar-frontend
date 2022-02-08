import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalHeader,
    ModalFooter
} from '@chakra-ui/react'
import ProductCard from './productCard';
import Button from '../../commons/atomic/button'

function ProductModal({ product, isOpen, onClose }) {

    const handleBid = () => {
        console.log('bidded')
    }
    return (
        <Modal size={"sm"} portalProps={product} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ProductCard isModal product={product} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleBid}>
                        Bid
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ProductModal;