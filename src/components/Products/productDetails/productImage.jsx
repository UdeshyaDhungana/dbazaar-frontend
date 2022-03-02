import React from 'react';
import {
    Box,
    Center,
    Image,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react'
import { getImageUrl } from '../../../services/productService';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

function ProductImage({ imageUrl, className, title }) {
    const { onOpen, onClose, isOpen } = useDisclosure();
    return (
        <>
            <Box
                role={'group'}
                className={`cursor-pointer ${className}`}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                zIndex={1}
                onClick={onOpen}
                pos={'relative'}>
                <Center>
                    <Box
                        rounded={'lg'}
                        pos={'relative'}
                        height={'230px'}
                        _after={{
                            transition: 'all .3s ease',
                            content: '""',
                            w: 'full',
                            h: 'full',
                            pos: 'absolute',
                            top: 5,
                            left: 0,
                            filter: 'blur(15px)',
                            zIndex: -1,
                        }}
                        _groupHover={{
                            _after: {
                                filter: 'blur(20px)',
                            },
                        }}>
                        <Image
                            rounded={'lg'}
                            height={230}
                            width={282}
                            objectFit={'cover'}
                            src={imageUrl && getImageUrl(imageUrl)} />
                    </Box>
                </Center>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image
                            src={imageUrl && getImageUrl(imageUrl)}
                            alt={title} />
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProductImage;