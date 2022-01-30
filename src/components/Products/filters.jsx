import {
    Icon,
    IconButton,
    useDisclosure,
    Box,
    Stack,
    useMediaQuery,
    FormControl,
    FormLabel,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    // RangeSlider,
    // RangeSliderTrack,
    // RangeSliderFilledTrack,
    // RangeSliderThumb,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { List, X } from 'phosphor-react'
import Button from '../commons/atomic/button';

const categories = [
    { id: 0, label: '' },
    { id: 1, label: 'Clothing' },
    { id: 2, label: 'Sports' },
    { id: 3, label: 'Kitchen Utensils' }
]

const stars = [
    { id: 0, label: '1 & Up'},
    { id: 1, label: '2 & Up'},
    { id: 2, label: '3 & Up'},
    { id: 3, label: '4 & Up'},
]

function FiltersForm() {
    const [category, setCategory] = useState("");
    // const [stars, setStars] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);

    return (
        <form>
            <FormControl className='my-4'>
                <FormLabel htmlFor='category'>Category</FormLabel>
                <Select width={'container.sm'} defaultValue={''} placeholder='All'>
                    {categories.map(({ id, label }) => (
                        <option key={id} value={id}>{label}</option>
                    ))}
                </Select>
            </FormControl>
            <div className="flex gap-4">
                <FormControl >
                    <FormLabel htmlFor='min-price'>Min. Price</FormLabel>
                    <NumberInput
                        clampValueOnBlur
                        min={0}
                        defaultValue={0}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl >
                    <FormLabel htmlFor='min-price'>Max. Price</FormLabel>
                    <NumberInput
                        clampValueOnBlur
                        min={minPrice}
                        defaultValue={Infinity}
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
                <Select width={'container.sm'} defaultValue={''} placeholder='Stars'>
                    {stars.map(({ id, label }) => (
                        <option key={id} value={id}>{label}</option>
                    ))}
                </Select>
            </FormControl>
            <Button>
                Go
            </Button>
        </form>
    );
}

function Filters({ hideOnMobile }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLargeScreen] = useMediaQuery("(min-width: 1024px)");

    return (
        <div className='my-8'>
            <IconButton
                size={'md'}
                icon={isOpen ? <Icon as={X} /> : <Icon as={List} />}
                aria-label={'Open Menu'}
                display={isLargeScreen ? "none" : "inherit"}
                onClick={isOpen ? onClose : onOpen}
            />
            {isOpen && (
                <Box pb={4} display={isLargeScreen ? "none" : "inherit"}>
                    <Stack spacing={4}>
                        <FiltersForm />
                    </Stack>
                </Box>
            )}
            <Box display={isLargeScreen ? "inherit" : "none"}>
                <FiltersForm />
            </Box>
        </div>
    );
}

export default Filters;