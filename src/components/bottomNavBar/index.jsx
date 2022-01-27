import React from 'react';
import { Text, Box } from '@chakra-ui/react';

function BottomNavBar() {
    return ( 
        <Box bg={'gray.100'} className='grid grid-cols-2 px-4 md:px-12 py-4 space-between'>
            <div className='col-span-1'>DecentBazaar Logo</div>
            <div className='col-span-1 justify-self-end text-left'>
                <Text className='mb-1' fontWeight={"semibold"} fontSize={"xl"}>Info</Text>
                <Text className='mb-1'>About Us</Text>
                <Text className='mb-1'>Contact Us</Text>
                <Text className='mb-1'>TS and CS</Text>
                <Text className='mb-1'>Privacy Policy</Text>
            </div>
        </Box>
     );
}

export default BottomNavBar;