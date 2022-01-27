import React from 'react';
import { Text, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom'

function BottomNavBar() {
    return (
        <Box bg={'gray.100'} className='grid grid-cols-2 px-4 md:px-12 py-4 space-between'>
            <div className='col-span-1'>DecentBazaar Logo</div>
            <div className='col-span-1 justify-self-end text-left'>
                <Text className='mb-1' fontWeight={"semibold"} fontSize={"xl"}>Info</Text>
                <Link to="/about-us">
                    <Text className='mb-1'>
                        About Us
                    </Text>
                </Link>
                <Link to="/privacy-policy">
                    <Text className='mb-1'>Privacy Policy</Text>
                </Link>
            </div>
        </Box>
    );
}

export default BottomNavBar;