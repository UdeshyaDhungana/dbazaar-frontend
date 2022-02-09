import {
    Button as ChakraButton,
    FormControl, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Button from '../commons/atomic/button';

function Login() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username)
        console.log(password)
    }

    return (
        <>
            <Button color='brandBlue.600'
                border='1px solid'
                borderColor='brandBlue.500'
                borderRadius='lg'
                onClick={onOpen}
                className={"mx-4"}>
                <Text fontFamily='Inter'>Login</Text>
            </Button>
            <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>Login</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl className='mb-4' isRequired>
                                <FormLabel htmlFor='username'>Username</FormLabel>
                                <Input
                                    required
                                    value={username}
                                    onChange={({ target: { value } }) => { setUsername(value) }}
                                    id='username' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <Input
                                    value={password}
                                    type={"password"}
                                    onChange={({ target: { value } }) => { setPassword(value) }}
                                    id='password' />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" onClick={handleSubmit} mr={3} filled>Login</Button>
                            <ChakraButton onClick={onClose}>
                                Close
                            </ChakraButton>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Login;