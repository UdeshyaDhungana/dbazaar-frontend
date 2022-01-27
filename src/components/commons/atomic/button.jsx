import { Button as ChakraButton } from "@chakra-ui/react";

// TODO: color needs to be adjusted
// TODO: needs to be adjusted for placing icons
// TODO: loading state

function Button({ children, shadow, filled, className }) {
    return (
        <ChakraButton
            colorScheme={'blue'}
            variant={filled? 'solid' : 'outline'}
            boxShadow={shadow? 'md' : 'inherit'}
            className={className}
        >
            {children}
        </ChakraButton>
    );
}

export default Button;