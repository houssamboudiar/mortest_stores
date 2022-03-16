import React, { Dispatch, FC, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue} from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import store, { useTypedSelector } from '../store/store';
import { getUserData, UserActionTypes, userLogin } from '../actions/userActions';
import { connect, useDispatch, useStore } from 'react-redux';
import { userReducer } from '../reducers/userReducer';
import history from "../utils/history";
import { render } from 'react-dom';

interface LoginProps {

}

const Login: FC<LoginProps> = () => {

       const { user } = useTypedSelector((state) => state.userState);

       const [myState, setMyState] = useState({
              username: "",
              password: "" 
       })
       const dispatch = useDispatch();

       const signin = async (myState: { username: string; password: string; }) => {
              const user = await dispatch(userLogin(myState.username, myState.password))
       }       

       const onChange=(e: any): void => {
              const { name, value } = e.currentTarget;
              setMyState({ ...myState, [name]: value });
       }

       return(
              <>
              { !user[0].loading && user[0].authenticated && (<Navigate to="/" replace={true} />) }
              <Flex
              minH={'100vh'}
              align={'center'}
              justify={'center'}
              bg={useColorModeValue('gray.50', 'gray.800')}>
                     <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                     <Stack align={'center'}>
                            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                            <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                            </Text>
                     </Stack>
                     <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={4}>
                            <FormControl id="email">
                            <FormLabel>Username</FormLabel>
                            <Input name="username" type="text" onChange={onChange}/>
                            </FormControl>
                            <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input name="password" type="password" onChange={onChange} />
                            </FormControl>
                            <Stack spacing={10}>
                            <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Remember me</Checkbox>
                            <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                            onClick={()=>{signin(myState)}}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                   bg: 'blue.500',
                            }}>
                            Sign in
                            </Button>
                            </Stack>
                            </Stack>
                     </Box>
                     </Stack>
              </Flex>
       </>
       )
}

export default Login