import React, { Dispatch, FC, useEffect, useState } from 'react';
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
	useColorModeValue,
       useToast,
       Alert,
       AlertIcon,
       AlertDescription,
       AlertTitle,
       CloseButton} from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../store/store';
import { getUserData, UserActionTypes, userLogin } from '../actions/userActions';
import { connect, useDispatch, useStore } from 'react-redux';
import { userReducer } from '../reducers/userReducer';
import history from "../utils/history";
import { render } from 'react-dom';
import { ErrorActionTypes } from '../actions/errorActions';
import { InfoOutlineIcon } from '@chakra-ui/icons'

interface LoginProps {

}

const Login: FC<LoginProps> = () => {
       
       const { user } = useTypedSelector((state) => state.userState);
       const { errorstate } = useTypedSelector((state) => state.errorState);
       
       const [myState, setMyState] = useState({
              username: "",
              password: "" 
       })
       const dispatch = useDispatch();
       
       const statuses = ['success', 'error', 'warning', 'info']

       const signin = async (myState: { username: string; password: string; }) => {
              const userLog = await dispatch(userLogin(myState.username, myState.password))
       }  

       const toast = useToast()

       useEffect(() => {
              // Add a 401 response interceptor
              if(errorstate==401){
                     toast({
                            position: 'bottom',
                            duration:3000,
                            render: () => (
                                   <Box p={5} bgColor={'red.400'} color={'whiteAlpha.900'} borderRadius={'lg'}>
                                          <Box display={'flex'} flexDir={'column'}  >
                                                 <Box display='flex'  align-items= 'center' p={2}>
                                                        <InfoOutlineIcon  w={6} h={6}  />
                                                        <Text paddingLeft={4} mr={2} fontWeight={'bold'} color={'whiteAlpha.900'}>Login Failed</Text>
                                                 </Box>
                                                 <Text>Something wrong with your credentials.</Text>
                                          </Box>
                                   </Box>
                            ),
                     })
                     dispatch({
                            type: ErrorActionTypes.SET_ERRORS,
                            payload: 0,
                     });
              }

       }, [] );

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