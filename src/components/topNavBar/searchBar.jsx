import React, { createRef, useState } from 'react';
import { Input, Icon, InputGroup, InputLeftElement, InputRightAddon, useMediaQuery } from '@chakra-ui/react';
import { MagnifyingGlass, X } from 'phosphor-react';

function SearchBar({ className, hideOnMobile }) {
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const searchInputRef = createRef();

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
        searchInputRef.current.focus();
    }

    return (
        <>
            <InputGroup
                bg={'brandGray.200'}
                display={hideOnMobile && isMobile ? 'none' : 'inherit'}
                className={'rounded-lg ' + className}
                fontFamily='Inter'>
                <InputLeftElement
                    pointerEvents='none'
                    children={<Icon as={MagnifyingGlass} color={"brandGray.100"} />}
                />
                <Input
                    value={searchKeyWord}
                    ref={searchInputRef}
                    onChange={handleChange}
                    type='text'
                    bf='brandGray.200'
                    onKeyPress={handleKeyPress}
                    placeholder='Search Products' />
                <InputRightAddon bg={'brandGray.200'} onClick={clearInput} className='cursor-pointer'>
                    <Icon as={X} color={"brandGray.100"} />
                </InputRightAddon>
            </InputGroup>
        </>
    );
}

export default SearchBar;