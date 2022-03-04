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
function CategorySelectInput({ className, value, setValue, insideForm }) {
    const [categories, setCategories] = useState([])
    const toast = useToast();

    useEffect(() => {
        getCategories().then(({ data }) => {
            setCategories(data)
            setCategories([{ id: "0", title: "---"}, ...data])
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
                value={value}
            >
                {categories.map(({ id, title }) => (
                    <option key={id} value={id}>{title}</option>
                ))}
            </Select>
        </FormControl>
    );
}

export default CategorySelectInput;