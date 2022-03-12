import {
  Button as ChakraButton,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Button from "../commons/atomic/button";
import { register } from "../../services/userService";
import unknownErrorToast from "../commons/atomic/unknownErrorToast";

function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  /* Register Form states */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // Keep track of errors
  const [emailError, setEmailError] = useState([]);
  const [walletAddressError, setWalletAddressError] = useState([]);
  const [usernameError, setUsernameError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [passwordConfirmError, setPasswordConfirmError] = useState([]);

  const isUserNameValid = () => {
    var re = /^\w+$/;
    if (re.test(username)) return true;
    return false;
  };

  const generateErrors = () => {
    let errorPresent = false;
    if (!isUserNameValid()) {
      setUsernameError(["Letters, numbers and underscores only allowed."]);
      errorPresent = true;
    } else setUsernameError([]);
    if (password.length < 8 || !isNaN(password)) {
      setPasswordError([
        "Please choose password according to the instructions.",
      ]);
      errorPresent = true;
    } else setPasswordError([]);
    if (passwordConfirm !== password) {
      setPasswordConfirmError(["Passwords do not match."]);
      errorPresent = true;
    } else setPasswordConfirmError([]);
    if (walletAddress.length > 70) {
      setWalletAddressError("Wallet Address can be upto 70 characters");
      errorPresent = true;
    } else setWalletAddressError([]);
    return errorPresent;
  };

  const generateErrorsAfterResponse = (data) => {
    console.log(data)
    const mapping = {
      username: setUsernameError,
      password: setPasswordError,
      email: setEmailError,
      wallet_address: setWalletAddressError,
    };
    Object.keys(data).forEach((key) => {
      mapping[key](data[key]);
    });
    const remainingFields = ["username", "password", "email"].filter(
      (x) => !Object.keys(data).includes(x)
    );
    remainingFields.forEach((key) => {
      mapping[key]([]);
    });
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setWalletAddress("");
    // clear errors
    setUsernameError([]);
    setPasswordError([]);
    setPasswordConfirmError([]);
    setWalletAddressError([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!generateErrors()) {
      register({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
        wallet_address: walletAddress,
      })
        .then((_) => {
          onClose();
          toast({
            title: "Account created.",
            description: "You may now login",
            status: "success",
            duration: 4000,
            isClosable: false,
          });
        })
        .catch(({ response }) => {
          if (response) {
            if (!Array.isArray(response))
              generateErrorsAfterResponse(response.data);
          } else {
            unknownErrorToast(toast);
          }
        })
        .finally((_) => {
          clearForm();
        });
    }
  };

  return (
    <>
      <Button
        color="brandBlue.600"
        border="1px solid"
        borderColor="brandBlue.500"
        borderRadius="lg"
        onClick={onOpen}
        className={"mx-4"}
      >
        <Text fontFamily="Inter">Register</Text>
      </Button>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>User Registration</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="grid md:grid-cols-2 md:gap-4 mb-4">
                <FormControl isRequired>
                  <FormLabel htmlFor="first-name">First Name</FormLabel>
                  <Input
                    value={firstName}
                    onChange={({ target: { value } }) => {
                      setFirstName(value);
                    }}
                    id="first-name"
                  />
                </FormControl>
                {/* Last name */}
                <FormControl isRequired>
                  <FormLabel htmlFor="last-name">Last Name</FormLabel>
                  <Input
                    value={lastName}
                    onChange={({ target: { value } }) => {
                      setLastName(value);
                    }}
                    id="last-name"
                  />
                </FormControl>
              </div>
              <div className="grid md:grid-cols-2 md:gap-4 mb-4">
                <FormControl isRequired>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    isInvalid={usernameError.length !== 0}
                    value={username}
                    onChange={({ target: { value } }) => {
                      setUsername(value);
                    }}
                    id="username"
                  />
                  {usernameError.map((error) => (
                    <FormHelperText color={"crimson"}>{error}</FormHelperText>
                  ))}
                </FormControl>
                {/* Last name */}
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type={"email"}
                    value={email}
                    onChange={({ target: { value } }) => {
                      setEmail(value);
                    }}
                    id="email"
                  />
                  {emailError.map((error) => (
                    <FormHelperText color={"crimson"}>{error}</FormHelperText>
                  ))}
                </FormControl>
              </div>
              <div className="mb-4">
                <FormControl isRequired>
                  <FormLabel htmlFor="wallet_address">Wallet Address</FormLabel>
                  <Input
                    value={walletAddress}
                    onChange={({ target: { value } }) => {
                      setWalletAddress(value);
                    }}
                    id="wallet_address"
                  />
                  {walletAddressError.map((error) => (
                    <FormHelperText color={"crimson"}>{error}</FormHelperText>
                  ))}
                </FormControl>
              </div>
              <FormControl className="mb-4" isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  isInvalid={passwordError.length !== 0}
                  type={"password"}
                  value={password}
                  onChange={({ target: { value } }) => {
                    setPassword(value);
                  }}
                  id="password"
                />
                {passwordError.map((error) => (
                  <FormHelperText color={"crimson"}>{error}</FormHelperText>
                ))}
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
                <FormLabel htmlFor="password-confirm">
                  Confirm Password
                </FormLabel>
                <Input
                  isInvalid={passwordConfirmError.length !== 0}
                  type={"password"}
                  value={passwordConfirm}
                  onChange={({ target: { value } }) => {
                    setPasswordConfirm(value);
                  }}
                  id="password-confirm"
                />
                {passwordConfirmError.map((error) => (
                  <FormHelperText color={"crimson"}>
                    {passwordConfirmError}
                  </FormHelperText>
                ))}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" mr={3}>
                Register
              </Button>
              <ChakraButton onClick={clearForm}>Clear</ChakraButton>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Register;
