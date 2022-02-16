import {
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
    NumberInputField,
    Select,
    NumberInputStepper, Textarea, useToast
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import Button from '../components/commons/atomic/button';
import { getCategories } from '../services/categoryService';

function ProductAddForm() {
    const [collections, setCollections] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [unit_price, setUnit_price] = useState(1);

    const toast = useToast();

    useState(() => {
        // query collections and get them
        getCategories()
        .then(({ data }) => {
            setCollections(data);
            console.log(data[0]);
        }).catch(error => {
            toast({
                title: "Error",
                description: "Error occured while fetching categories",
                duration: 4000,
                status: "error",
                isClosable: false,
            })
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
        console.log(title)
        console.log(description);
        console.log(unit_price);
    }

    return (
        <div className='grid'>
            <form className='md:w-3/5 justify-self-center' onSubmit={handleSubmit}>
            <Heading marginBottom={4} >Add Product</Heading>
                <FormControl className='mb-5' >
                    <FormLabel htmlFor="product-title">Title</FormLabel>
                    <Input
                        className='w-1/4'
                        id="product-title"
                        value={title}
                        onChange={({ target: { value } }) => setTitle(value)}
                        maxLength={255} />
                    <FormHelperText>Up to 255 characters</FormHelperText>
                </FormControl>

                <FormControl className='mb-5' >
                    <FormLabel htmlFor="product-description">Description</FormLabel>
                    <Textarea
                        className='w-1/4'
                        id="product-title"
                        value={description}
                        onChange={({ target: { value } }) => setDescription(value)} />
                    {/* <FormHelperText></FormHelperText> */}
                </FormControl>

                <FormControl className='mb-5'>
                    <FormLabel htmlFor="product-price">Price</FormLabel>
                <NumberInput min={1} value={unit_price} onChange={price => setUnit_price(price)} clampValueOnBlur={true}>
                    <NumberInputField id="product-price" />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                </FormControl>

                <FormControl className='mb-5'>
                    <FormLabel htmlFor='product-category'>Category</FormLabel>
                    <Select>
                        {collections.map(({ title, id }) => (
                            <option key={id} value={id}>{title}</option>
                        ))}
                    </Select>
                </FormControl>

                <Button type="submit">
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