import {
    Button as ChakraButton,
    FormControl, FormHelperText, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Button from '../commons/atomic/button';

function Register({ label, title, onSubmit, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    /* Register Form states */
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Keep track of errors
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');

    const generateErrors = () => {
        let errorPresent = false;
        if (password.length < 8 || !isNaN(password)){
            setPasswordError('Please choose password according to instructions');
            errorPresent = true;
        }
        else
            setPasswordError('');
        if (passwordConfirm !== password) {
            setPasswordConfirmError('Please match passwords');
            errorPresent = true;
        }
        else
            setPasswordConfirmError('');
        return errorPresent;
    }

    const clearForm = () => {
        setUsername('');
        setPassword('');
        setPasswordConfirm('');
        setEmail('');
        setFirstName('');
        setLastName('');
        // clear errors
        setPasswordError('');
        setPasswordConfirmError('');
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(firstName)
        console.log(lastName)
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(passwordConfirm)
        // Generate errors
        console.log(generateErrors())
    }

    return (
        <>
            <Button shadow onClick={onOpen} className={"mx-4"}>
                Register
            </Button>
            <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>User Registration</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div className='grid md:grid-cols-2 md:gap-4 mb-4'>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='first-name'>First Name</FormLabel>
                                    <Input
                                        value={firstName}
                                        onChange={({ target: { value } }) => { setFirstName(value) }}
                                        id='first-name' />
                                </FormControl>
                                {/* Last name */}
                                <FormControl isRequired>
                                    <FormLabel htmlFor='last-name'>Last Name</FormLabel>
                                    <Input

                                        value={lastName}
                                        onChange={({ target: { value } }) => { setLastName(value) }}
                                        id='last-name' />
                                </FormControl>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-4 mb-4">
                                <FormControl isRequired>
                                    <FormLabel htmlFor='username'>Username</FormLabel>
                                    <Input
                                        value={username}
                                        onChange={({ target: { value } }) => { setUsername(value) }}
                                        id='username' />
                                </FormControl>
                                {/* Last name */}
                                <FormControl isRequired>
                                    <FormLabel htmlFor='email'>Email</FormLabel>
                                    <Input
                                        type={"email"}
                                        value={email}
                                        onChange={({ target: { value } }) => { setEmail(value) }}
                                        id='email' />
                                </FormControl>
                            </div>
                            <FormControl className='mb-4' isRequired>
                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <Input
                                    isInvalid={passwordError}
                                    type={"password"}
                                    value={password}
                                    onChange={({ target: { value } }) => { setPassword(value) }}
                                    id='password' />
                                {passwordError &&
                                    <FormHelperText color={"crimson"}>
                                        Please enter password according to the instructions below
                                    </FormHelperText>}
                                <FormHelperText>
                                    <ul>
                                        <li>Can't be too similar to your personal information</li>
                                        <li>Must contain atleast 8 characters</li>
                                        <li>Can't be commonly used password</li>
                                        <li>Can't be entirely numeric</li>
                                    </ul>
                                </FormHelperText>
                            </FormControl>
                            {/* Last name */}
                            <FormControl isRequired>
                                <FormLabel htmlFor='password-confirm'>Confirm Password</FormLabel>
                                <Input
                                    isInvalid={passwordConfirmError}
                                    type={"password"}
                                    value={passwordConfirm}
                                    onChange={({ target: { value } }) => { setPasswordConfirm(value) }}
                                    id='password-confirm' />
                                {passwordConfirmError &&
                                    <FormHelperText color={"crimson"}>
                                        Passwords do not match
                                    </FormHelperText>}
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" mr={3} filled>Register</Button>
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

export default Register;