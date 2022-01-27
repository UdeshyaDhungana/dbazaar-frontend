import {
  Box,
  Flex,
  Avatar,
  HStack,
  // Link,
  IconButton,
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from '@chakra-ui/react';

import '@fontsource/red-hat-display/700.css'

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useMediaQuery } from '@chakra-ui/react';

import Button from '../commons/atomic/button'
import SearchBar from './searchBar';

// const Links = ['Dashboard', 'Projects', 'Team'];

// const NavLink = ({ children }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

export default function TopNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");


  return (
    <>
      <Box className='border-b' bg={useColorModeValue('white', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Heading color='brand.100'>DecentBazaar</Heading></Box>
            {/* <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack> */}
            <SearchBar hideOnMobile />
          </HStack>
          <Flex alignItems={'center'}>
            <Box display={isMobile? 'none': 'inherit'} className='flex'>
            <Button className={'mx-2'}>
              Sign In
            </Button>
            <Button shadow className={'mx-4'}>
              My Cart
            </Button>
            </Box>
            <Menu>
              <MenuButton
                as={ChakraButton}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <SearchBar className={'mb-4'} />
            <Stack as={'nav'} spacing={4}>
              <Button>
                Sign In
              </Button>
              <Button shadow>
                My Cart
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}