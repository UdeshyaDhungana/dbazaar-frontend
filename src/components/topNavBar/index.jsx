import {
  Avatar, Box, Button as ChakraButton, Drawer, DrawerBody, DrawerContent,
  DrawerHeader, DrawerOverlay, Flex, Heading, HStack,
  Icon, IconButton,
  Image,
  Menu,
  MenuButton, MenuDivider, MenuItem, MenuList, useColorModeValue, useDisclosure, useMediaQuery
} from '@chakra-ui/react';
import { List, X } from 'phosphor-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../logo.png';
import { removeAccessToken } from '../../services/userService';
import Login from './login';
import Register from './register';
import SearchBar from './searchBar';


export default function TopNavBar({ setUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const user = useContext(UserContext);

  const handleLogout = () => {
    removeAccessToken();
    window.location.href = "/";
  }

  return (
    <Box className='border-b' bg={useColorModeValue('white', 'brandGray.100')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        {/* Icon button for mobile */}
        <IconButton
          size={'md'}
          icon={isOpen ? <Icon as={X} /> : <Icon as={List} />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        {/* Icon menu (ham) for mobile */}
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay display={{ md: 'none' }} />
          <DrawerContent display={{ md: 'none ' }}>
            <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
            <DrawerBody>
              <SearchBar className={'mb-4'} noCrossButton />
              {!user && <Flex>
                <Login setUser={setUser} />
                <Register />
              </Flex>}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        {/* Middle Part */}
        <HStack spacing={8} alignItems={'center'}>
          <Image
            boxSize='40px'
            objectFit='cover'
            src={logo}
            alt='DLogo'
          />
          <Link to="/">
            <Box><Heading size ="lg" color='brandBlue.100'>DecentBazaar</Heading></Box>
          </Link>
          <SearchBar hideOnMobile />
        </HStack>
        <Flex alignItems={'center'}>
          {!user && <Box display={isMobile ? 'none' : 'inherit'} className='flex'>
            <Login setUser={setUser} />
            <Register />
          </Box>}
          {/* Profile Section */}
          {user && (
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
                    'https://picsum.photos/id/237/200/300'
                  }
                />
              </MenuButton>
              <MenuList zIndex={"dropdown"}>
                <MenuItem>Profile</MenuItem>
                <MenuItem><Link to="/products/add">Add Product</Link></MenuItem>
                <MenuItem><Link to="/products/mine">My Products</Link></MenuItem>
                <MenuItem><Link to="/products/my-bids">My Bids</Link></MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>)}
        </Flex>
      </Flex>
    </Box>
  );
}