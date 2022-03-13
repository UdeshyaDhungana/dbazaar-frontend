import { Heading, useToast, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import unknownErrorToast from "../components/commons/atomic/unknownErrorToast";
import { getMyDetails, getVerificationToken } from "../services/userService";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import Button from "../components/commons/atomic/button";

function Profile() {
  const user = useContext(UserContext);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  const [signedToken, setSignedToken] = useState("");

  useEffect(() => {
    getMyDetails()
      .then(
        ({
          data: {
            email,
            username,
            first_name,
            last_name,
            wallet_address,
            public_key,
            verified,
          },
        }) => {
          setEmail(email);
          setFirstName(first_name);
          setLastName(last_name);
          setWalletAddress(wallet_address);
          setUsername(username);
          setPublicKey(public_key);
          setVerified(verified);
        }
      )
      .catch((_) => {
        unknownErrorToast(toast);
      });
  }, [toast]);

  const getFullName = ({ firstname, lastname }) => {
    return `${firstname} ${lastname}`;
  };

  const onGetToken = () => {
    getVerificationToken()
      .then(({ data: { token } }) => {
        setToken(token);
      })
      .catch((_) => {
        unknownErrorToast(toast);
      });
  };

  const onVerify = () => {
      console.log(signedToken)
  }

  return user ? (
    <div>
      <Heading className="mb-4">User Details</Heading>
      <Text size={"lg"} fontWeight={"bold"}>
        Email
      </Text>
      <Text className="mb-3">{email}</Text>

      <Text size={"lg"} fontWeight={"bold"}>
        Username
      </Text>
      <Text className="mb-3">{username}</Text>

      <Text size={"lg"} fontWeight={"bold"}>
        Name
      </Text>
      <Text className="mb-3">
        {getFullName({ firstname: firstName, lastname: lastName })}
      </Text>

      <Text size={"lg"} fontWeight={"bold"}>
        Wallet Address
      </Text>
      <Text className="mb-3">{walletAddress}</Text>

      <Text size={"lg"} fontWeight={"bold"}>
        Public Key
      </Text>
      <Text className="mb-3">{publicKey}</Text>

      <Text size={"lg"} fontWeight={"bold"}>
        Verification Status
      </Text>
      <Text className="mb-3">{verified ? "Verified" : "Not Verified"}</Text>

      {!verified && (
        <>
          <Button
            disabled={token.length > 0}
            className={"mb-3"}
            onClick={onGetToken}
          >
            Get Verification Token
          </Button>
          {token && <Text className="mb-3">Token is: {token}</Text>}
          <div className="mb-4">
          <FormControl>
            <FormLabel htmlFor="token">Signed Token</FormLabel>
            <Input
              id="signed-token"
              value={signedToken}
              onChange={({ target: { value } }) => setSignedToken(value)}
              type="signed-token"
            />
          </FormControl>
          </div>
          <Button filled onClick={onVerify}>
            Verify
          </Button>
        </>
      )}
    </div>
  ) : (
    <Navigate to={"/"} />
  );
}

export default Profile;
