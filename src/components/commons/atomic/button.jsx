import { Button as ChakraButton } from "@chakra-ui/react";

// TODO: color needs to be adjusted
// TODO: needs to be adjusted for placing icons
// TODO: loading state

function Button({
    children,
    shadow,
    danger,
    filled,
    ...props }) {
    return (
        <ChakraButton
            colorScheme={danger? "red": "blue"}
            variant={danger? 'solid': filled? 'solid' : 'outline'}
            boxShadow={shadow ? 'md' : 'inherit'}
            borderColor={'brandBlue.500'}
            {...props}
        >
            {children}
        </ChakraButton>
    );
}

export default Button;