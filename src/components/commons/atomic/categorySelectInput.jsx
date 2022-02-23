import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Select,
    useToast,
} from '@chakra-ui/react'
import { useEffect } from 'react';
import { getCategories } from '../../../services/categoryService'
import unknownErrorToast from './unknownErrorToast'

// Pass the name of 
function CategorySelectInput({ className, setValue, insideForm }) {
    const [categories, setCategories] = useState([])
    const toast = useToast();

    useEffect(() => {
        getCategories().then(({ data }) => {
            setCategories(data)
        }).catch(_ => {
            unknownErrorToast(toast);
        })
    }, [toast])
    return (
        <FormControl className={className}>
            {insideForm && <FormLabel>Category</FormLabel>}
            <Select
                onChange={({ target: { value } }) => {
                    setValue(value);
                }}
            >
                {categories.map(({ id, title }) => (
                    <option key={id} value={id}>{title}</option>
                ))}
            </Select>
        </FormControl>
    );
}

export default CategorySelectInput;