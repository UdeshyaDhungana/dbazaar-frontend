import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, InputRightAddon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMediaQuery } from '@chakra-ui/react';

function SearchBar({ className, hideOnMobile }) {
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const handleChange = ({ target: { value } }) => {
        setSearchKeyWord(value);
    }

    const handleKeyPress = ({ key }) => {
        if (key === 'Enter') {
            console.log("Enter key pressed. Commencing search")
            console.log(searchKeyWord)
        }
    }

    const clearInput = () => {
        setSearchKeyWord('');
    }

    return (
        <>
            <InputGroup
                bg={'gray.100'}
                display={hideOnMobile && isMobile ? 'none' : 'inherit'}
                className={'rounded-lg ' + className}>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                />
                <Input
                    value={searchKeyWord}
                    onChange={handleChange}
                    type='text'
                    onKeyPress={handleKeyPress}
                    placeholder='Search Products' />
                <InputRightAddon onClick={clearInput} className='cursor-pointer'>
                    <CloseIcon color='gray.300' />
                </InputRightAddon>
            </InputGroup>
        </>
    );
}

export default SearchBar;