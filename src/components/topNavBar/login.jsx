import {
    Button as ChakraButton,
    FormControl, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text, FormHelperText, useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Button from '../commons/atomic/button';
import { createToken, getCurrentUser, saveToken } from '../../services/userService'
import unknownErrorToast from '../commons/atomic/unknownErrorToast';

function Login({ setUser }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const clearForm = () => {
        setUsername('');
        setPassword('');
        setErrorMessage('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createToken({
            username,
            password
        }).then(({ data }) => {
            saveToken(data);
            setUser(getCurrentUser())
            onClose();
            toast({
                title: "Success!",
                description: "User logged in successfully.",
                duration: 4000,
                status: "success"
            })
        }).catch(({ response }) => {
            if (response){
                setErrorMessage('The password or username is incorrect')
            } else {
                unknownErrorToast(toast);
            }
        })
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
                                {errorMessage &&
                                    <FormHelperText color={"crimson"}>
                                        {errorMessage}
                                    </FormHelperText>}
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" onClick={handleSubmit} mr={3}>Login</Button>
                            <ChakraButton onClick={clearForm}>
                                Clear
                            </ChakraButton>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Login;