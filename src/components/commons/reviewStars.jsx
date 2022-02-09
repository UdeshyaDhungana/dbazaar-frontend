import React from 'react';
import {
    Box,
    Icon,
} from '@chakra-ui/react'

import { Star } from 'phosphor-react'

function ReviewStars({ stars }) {
    return ( 
        <Box display='flex' mt='2' alignItems='center'>
        {Array(5)
            .fill('')
            .map((_, i) => (
                <Icon
                    as={Star}
                    key={i}
                    weight={i < stars ? 'fill' : 'regular'}
                    color={'orange.300'}
                />
            ))}
    </Box>
     );
}

export default ReviewStars;