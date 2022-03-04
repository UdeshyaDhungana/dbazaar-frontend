import {
    Box, Collapse, FormControl,
    FormLabel, Icon, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
    NumberInputField,
    NumberInputStepper, Stack, useDisclosure
} from '@chakra-ui/react';
import { FadersHorizontal, X } from 'phosphor-react';
import React, { useState } from 'react';
import Button from '../commons/atomic/button';
import CategorySelectInput from '../commons/atomic/categorySelectInput'


function FiltersForm({ applyFilter }) {
    const [category, setCategory] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilter({
            collection_id: category,
            unit_price__gt: minPrice,
            unit_price__lt: maxPrice,
        });
    }

    return (
        <form className='md:w-1/2' onSubmit={handleSubmit}>
            <CategorySelectInput
                value={category}
                name={'category'}
                className={'my-4'}
                setValue={setCategory} />
            <div className='mb-4 w-full md:w-1/2 flex gap-4 '>
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
            <Button
                type={"submit"}
                disabled={(maxPrice === minPrice === 0) || (maxPrice <= minPrice)}>
                Go
            </Button>
        </form >
    );
}

function Filters({ applyFilter }) {
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
                        <FiltersForm applyFilter={applyFilter} />
                    </Stack>
                </Box>
            </Collapse>
        </div>
    );
}

export default Filters;