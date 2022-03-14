import {
    Badge,
    Box,
    FormLabel,
    Heading,
    Icon,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Switch, Tooltip,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { CircleWavyCheck, Warning } from "phosphor-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import Button from "../components/commons/atomic/button";
import unknownErrorToast from "../components/commons/atomic/unknownErrorToast";
import Bids from "../components/Products/productDetails/bids";
import Comments from "../components/Products/productDetails/comments";
import ProductImage from "../components/Products/productDetails/productImage";
import {
    deleteProduct,
    getSingleProuct,
    toggleVisibility
} from "../services/productService";

function ProductDetail() {
  const user = useContext(UserContext);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [refresh, setRefresh] = useState(false);

  const [productId, setProductId] = useState(0);
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productOwnerId, setProductOwnerId] = useState(0);
  const [visible, setVisible] = useState(false);
  const [userVerification, setUserVerification] = useState(false);

  useEffect(() => {
    getSingleProuct(id)
      .then(
        ({
          data: { id, visible, title, image, unit_price, description, owner },
        }) => {
          setProductId(id);
          setLabel(title);
          setPrice(unit_price);
          setDescription(description);
          setPostedBy(`${owner.firstname} ${owner.lastname}`);
          setImageUrl(image);
          setProductOwnerId(owner.user);
          setUserVerification(owner.verified)
          setVisible(visible);
        }
      )
      .catch((_) => {
        window.location.href = "/not-found";
      });
  }, [id, toast]);

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then((_) => {
        onClose();
        navigate("/");
      })
      .catch((_) => {
        unknownErrorToast(toast);
      });
  };

  const handleToggle = () => {
    toggleVisibility(productId, !visible)
      .then(({ data: { visible } }) => {
        setVisible(visible);
        setRefresh(!refresh);
      })
      .catch((_) => {
        console.log(_);
      });
  };

  return (
    <>
      <div className="grid my-10 md:grid-cols-2">
        <ProductImage
          className="justify-self-center"
          title={label}
          imageUrl={imageUrl}
        />
        <Box>
          <div>
            <Heading marginBottom={"3"} size={"lg"}>
              {label} {!visible && <Badge>Unlisted</Badge>}
            </Heading>
            <FormLabel fontWeight={"bold"} htmlFor="visibility">
              Visibility:{" "}
            </FormLabel>
            {user && user.user_id === productOwnerId && (
              <>
                <Switch
                  marginRight={"3"}
                  id="visibility"
                  onChange={handleToggle}
                  isChecked={visible}
                />
                <Tooltip
                  label="Toggling visibility will delete all transfers and bids related to the product"
                  fontSize="md"
                >
                  <Icon w={8} h={8} color={"yellow.500"} as={Warning} />
                </Tooltip>
              </>
            )}
          </div>
          <div>By {postedBy} {userVerification && <CircleWavyCheck className="inline" color={'skyblue'} size={20} weight="bold" />}</div>
          <div className="mt-2">Rs. {price}</div>
          <div className="mt-3">{description}</div>
          {user && user.user_id === productOwnerId && (
            <Button onClick={onOpen} className={"my-2"} danger>
              Delete
            </Button>
          )}
        </Box>
      </div>
      {/* Only Authenticated Users can See ownership history */}
      {/* {user && <OwnershipHistory />} */}
      <div className={`grid ${user ? "md:grid-cols-2" : ""} gap-8`}>
        <Comments productId={productId} />
        {user && (
          <Bids
            refresh={refresh}
            visible={visible}
            isOwner={user.user_id === productOwnerId}
            productId={productId}
          />
        )}
      </div>
      <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Confirm</ModalHeader>
          <ModalCloseButton />
          <ModalFooter justifyContent={"center"}>
            <Button
              filled
              danger
              onClick={() => handleDeleteProduct(productId)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProductDetail;
