import { Box, Button, Center } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProductActionTypes } from '../product/productActions';
import { getUserData } from '../actions/userActions';
import { IUserState } from '../reducers/userReducer';
import { useTypedSelector } from '../store/store';
import ManageProducts from './containers/Product/ManageProducts';
import MainTask from './MainTask';
import SidebarWithHeader from './Sidebar';
import ManageCounter from './containers/Comptoir/ManageCounter';
import { Spinner } from '@chakra-ui/react'

interface Props {

}


const Loader: FC<Props> = () => {

       return (
       <>
              <Box mt={"17em"}>
                     <Center>
                            <Spinner size='xl' />
                     </Center>
              </Box>
       </>);

};

export default Loader;