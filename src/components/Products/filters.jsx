import {
    Box, Collapse, FormControl,
    FormLabel, Icon, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
    NumberInputField,
    NumberInputStepper, Select, Stack, useDisclosure
} from '@chakra-ui/react';
import { FadersHorizontal, X } from 'phosphor-react';
import React, { useState } from 'react';
import Button from '../commons/atomic/button';

const categories = [
    { id: 0, label: '' },
    { id: 1, label: 'Clothing' },
    { id: 2, label: 'Sports' },
    { id: 3, label: 'Kitchen Utensils' }
]

const stars = [
    { id: 0, label: '1 & Up' },
    { id: 1, label: '2 & Up' },
    { id: 2, label: '3 & Up' },
    { id: 3, label: '4 & Up' },
]

function FiltersForm() {
    const [category, setCategory] = useState(0);
    const [star, setStar] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // submit now
        console.log(category, star, minPrice, maxPrice);
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl className='my-4'>
                <FormLabel htmlFor='category'>Category</FormLabel>
                <Select
                    name='category'
                    w={{ md: "96", sm: "100" }}
                    value={category}
                    onChange={({target: {value}}) => {
                        setCategory(value);
                    }}
                >
                    {categories.map(({ id, label }) => (
                        <option key={id} value={id}>{label}</option>
                    ))}
                </Select>
            </FormControl>
            <div className='w-full md:w-1/2 flex gap-4'>
                <FormControl _invalid={{ borderColor: 'crimson' }} >
                    <FormLabel htmlFor='min-price'>Min. Price</FormLabel>
                    <NumberInput
                        clampValueOnBlur
                        min={0}
                        name='min-price'
                        value={minPrice}
                        onChange={value => {
                            if (value >= 0)
                                setMinPrice(value);
                        }}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='max-price'>Max. Price</FormLabel>
                    <NumberInput
                        clampValueOnBlur
                        min={0}
                        name='max-price'
                        value={maxPrice}
                        onChange={value => {
                            if (value >= 0)
                                setMaxPrice(value);
                        }}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
            </div>
            <FormControl className='my-4'>
                <FormLabel htmlFor='stars'>Stars</FormLabel>
                <Select
                    w={{ md: "96", sm: "100" }}
                    name='stars'
                    value={star}
                    onChange={({ target: { value } }) => {
                        setStar(value);
                    }}
                >
                    {stars.map(({ id, label }) => (
                        <option key={id} value={id}>{label}</option>
                    ))}
                </Select>
            </FormControl>
            <Button
                type={"submit"}
                disabled={!(minPrice || maxPrice) ? false : (minPrice > maxPrice) ? true : false}>
                Go
            </Button>
        </form >
    );
}

function Filters() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <div className='my-8'>
            <Button
                size={'md'}
                leftIcon={isOpen ? <Icon as={X} /> : <Icon as={FadersHorizontal} />}
                onClick={onToggle}>
                Filters
            </Button>
            <Collapse in={isOpen} animateOpacity>
                <Box pb={4}>
                    <Stack spacing={4}>
                        <FiltersForm />
                    </Stack>
                </Box>
            </Collapse>
        </div>
    );
}

export default Filters;