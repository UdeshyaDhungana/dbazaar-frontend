import {
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input, InputGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
    NumberInputField, NumberInputStepper, Textarea, useToast
} from '@chakra-ui/react';
import React, { createRef, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import Button from '../components/commons/atomic/button';
import CategorySelectInput from '../components/commons/atomic/categorySelectInput';
import unknownErrorToast from '../components/commons/atomic/unknownErrorToast';
import { addProduct } from '../services/productService';

function ProductAddForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [unit_price, setUnit_price] = useState(1);
    const [category, setCategory] = useState(0);

    const [submitted, setSubmitted] = useState(false);
    const [redirectId, setRedirectId] = useState();

    const fileRef = createRef();
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('unit_price', unit_price);
        formData.append('collection', category);
        formData.append('photo', fileRef.current.files[0]);

        // Post product
        addProduct(formData)
            .then(({ data: { id } }) => {
                setRedirectId(id);
                setSubmitted(true);
            })
            .catch(_ => {
                unknownErrorToast(toast);
            });
    }

    return (
        submitted ?
            <Navigate to={`/products/${redirectId}`} state={{newProduct: true}} />
            : <div className='grid'>
                <form className='md:w-3/5 justify-self-center' onSubmit={handleSubmit}>
                    <Heading marginBottom={4} >Add Product</Heading>
                    <FormControl isRequired className='mb-5' >
                        <FormLabel htmlFor="product-title">Title</FormLabel>
                        <Input
                            className='w-1/4'
                            id="product-title"
                            value={title}
                            onChange={({ target: { value } }) => setTitle(value)}
                            maxLength={255} />
                        <FormHelperText>Up to 255 characters</FormHelperText>
                    </FormControl>

                    <FormControl isRequired className='mb-5' >
                        <FormLabel htmlFor="product-description">Description</FormLabel>
                        <Textarea
                            className='w-1/4'
                            id="product-title"
                            value={description}
                            onChange={({ target: { value } }) => setDescription(value)} />
                        {/* <FormHelperText></FormHelperText> */}
                    </FormControl>

                    <FormControl isRequired className='mb-5'>
                        <FormLabel htmlFor="product-price">Price</FormLabel>
                        <NumberInput min={1} value={unit_price} onChange={price => setUnit_price(price)} clampValueOnBlur={true}>
                            <NumberInputField id="product-price" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <CategorySelectInput
                        value={category}
                        setValue={setCategory}
                        className={'mb-5'}
                        insideForm />

                    <FormControl className='mb-5' isRequired>
                        <FormLabel htmlFor='product-image'>Product Image</FormLabel>
                        <InputGroup>
                            <input ref={fileRef} type='file' accept={'image/*'} name={'product-image'} className='none' />
                        </InputGroup>
                    </FormControl>

                    <Button filled type="submit">
                        Add
                    </Button>
                </form>
            </div>
    );
}


function AddProduct() {
    const user = useContext(UserContext)

    return (user ?
        <ProductAddForm />
        : <Navigate to="/" />)
}

export default AddProduct;