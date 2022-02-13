import React from 'react';
import { Image, Text, Box, HStack, Heading } from '@chakra-ui/react';
import logo from '../../logo.png';
import { Link } from 'react-router-dom'

function BottomNavBar() {
    return (
        <Box bg={'brandGray.200'} className='grid grid-cols-2 px-4 md:px-12 py-4 space-between'>
            <div className='col-span-1' >
                <HStack spacing={8} alignItems={'center'} pt='1.5rem'>
                    <Image
                        boxSize='40px'
                        objectFit='cover'
                        src={logo}
                        alt='DLogo'
                    />
                    <Link to="/">
                        <Box><Heading size="lg" color='brandBlue.100'>DecentBazaar</Heading></Box>
                    </Link>
                </HStack>
            </div>
            <div className='col-span-1 justify-self-end text-left'>
                <Text className='mb-1' fontWeight={"semibold"} fontSize={"xl"} fontFamily='Inter'>Info</Text>
                <Link to="/about-us">
                    <Text fontFamily='Inter' className='mb-1'>
                        About Us
                    </Text>
                </Link>
                <Link to="/privacy-policy">
                    <Text className='mb-1' fontFamily='Inter'>Privacy Policy</Text>
                </Link>
            </div>
        </Box>
    );
}

export default BottomNavBar;