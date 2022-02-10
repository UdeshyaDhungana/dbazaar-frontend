import {
  Box,
  Flex,
  Avatar,
  HStack,
  Icon,
  IconButton,
  Image,
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
  Text,
} from '@chakra-ui/react';

import logo from '../../logo.png';
import { X, List } from 'phosphor-react';

import { useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Button from '../commons/atomic/button'
import SearchBar from './searchBar';
import Register from './register';
import Login from './login'

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
  const { isHamMenuOpen, onHamMenuOpen, onHamMenuClose } = useDisclosure();

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <Box className='border-b' bg={useColorModeValue('white', 'brandGray.100')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isHamMenuOpen ? <Icon as={X} /> : <Icon as={List} />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isHamMenuOpen ? onHamMenuClose : onHamMenuOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Image
              boxSize='40px'
              objectFit='cover'
              src={logo}
              alt='DLogo'
            />
            <Link to="/">
              <Box><Heading color='brandBlue.100'>DecentBazaar</Heading></Box>
            </Link>
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
            <Box display={isMobile ? 'none' : 'inherit'} className='flex'>
              <Login />
              <Register />
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

        {isHamMenuOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <SearchBar className={'mb-4'} />
            <Stack as={'nav'} spacing={4}>
              <Button className={'mx-4'}
                color='brandBlue.600'
                border='1px solid'
                borderColor='brandBlue.500'
                borderRadius='lg'>
                <Text fontFamily='Inter'>Sign In</Text>
              </Button>
              <Button className={'mx-4'}
                color='brandBlue.600'
                border='1px solid'
                borderColor='brandBlue.500'
                borderRadius='lg'>
                <Text fontFamily='Inter'>My Cart</Text>
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}