import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
  FiCreditCard,
  FiPackage
} from 'react-icons/fi';

import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogout } from "../actions/userActions";
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../store/store';
import { SpointActionTypes } from '../actions/spActions';
import { MdArrowDownward, MdArrowDropUp, MdSwitchLeft } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';
interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
  selected: boolean;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiHome, route: 'main',selected:false },
  { name: 'Sales', icon: FiTrendingUp, route: 'products',selected:false },
  { name: 'Clients', icon: FiCompass, route: '/',selected:false },
  { name: 'Providers', icon: FiStar, route: '/',selected:false },
  { name: 'Settings', icon: FiSettings, route: '/',selected:false },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate()
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Mortest
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <NavItem key={1} icon={FiHome} onClick={() => navigate('main')}  >
        Dashboard
      </NavItem>
      <NavItem key={6} icon={FiCreditCard} onClick={() => navigate('comptoir')}  >
        Comptoir
      </NavItem>
      <NavItem key={7} icon={FiTrendingUp} onClick={() => navigate('sales')}  >
        Sales
      </NavItem>
      <NavItem key={2} icon={FiPackage} onClick={() => navigate('products')}  >
        Products
      </NavItem>
      <NavItem key={3} icon={FiUser} onClick={() => navigate('clients')}  >
        Clients
      </NavItem>
      <NavItem key={4} icon={FiCompass} onClick={() => navigate('/')}  >
        Providers
      </NavItem>
      <NavItem key={5} icon={FiSettings} onClick={() => navigate('/')}  >
        Settings
      </NavItem>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {

  const dispatch = useDispatch();
  const signout = () => {
    dispatch(userLogout())
  }

  const setSP = (spoints:any, sp:any) => {
    dispatch({type:SpointActionTypes.LOADING_SPOINTS})
    dispatch({type: SpointActionTypes.SET_Spoint, spoints:spoints ,selectedSpoint:sp})
  }

  const {spoints, selectedSpoint, loading} = useTypedSelector((state) => state.spointState);
  const {user} = useTypedSelector((state) => state.userState);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Mortest
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        {!loading&&<Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                  <Tag p={3} size={'lg'} variant='subtle' colorScheme='telegram'>
                    <TagLabel mr={'1em'} ml={'1em'} fontWeight={'bold'} fontSize={'lg'} >{selectedSpoint.wilaya}</TagLabel>
                    <TagLeftIcon as={FaChevronDown} />
                  </Tag>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              {spoints.map((sp:any,i) => {
                      return  <MenuItem  onClick={()=>{setSP(spoints,sp)}} value={sp.id}key={i}>{sp.name+" "+sp.wilaya}</MenuItem>
              })}
            </MenuList>
          </Menu>
        </Flex>}
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  ml="0.5"
                  size={'md'}
                  name={user.username}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="1">
                  <Text fontSize="md">{user.username}</Text>
                  <Text fontSize="sm" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={signout}  >Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
      </HStack>
    </Flex>
  );
};