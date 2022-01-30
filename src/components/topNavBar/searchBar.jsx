import React, { useState } from 'react';
import { Input, Icon, InputGroup, InputLeftElement, InputRightAddon, useMediaQuery } from '@chakra-ui/react';
import { MagnifyingGlass, X } from 'phosphor-react';

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
                    children={<Icon as={MagnifyingGlass} color={"gray.900"} />}
                />
                <Input
                    value={searchKeyWord}
                    onChange={handleChange}
                    type='text'
                    onKeyPress={handleKeyPress}
                    placeholder='Search Products' />
                <InputRightAddon onClick={clearInput} className='cursor-pointer'>
                    <Icon as={X} color={"gray.900"} />
                </InputRightAddon>
            </InputGroup>
        </>
    );
}

export default SearchBar;