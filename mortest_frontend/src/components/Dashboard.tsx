import { Button } from '@chakra-ui/react';
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

interface DashboardProps {

}


const Dashboard: FC<DashboardProps> = () => {
       const navigate  = useNavigate();
       
       const { user } = useTypedSelector((state) => state.userState);

       useEffect(() => {
              if(user[0].authenticated == false){
                     navigate("/login/");
              }
       }, [user]);

       if(user[0].loading == false){
              return (
              <>
                     <SidebarWithHeader>
                            <Routes>
                                   <Route path="/main/" element={<MainTask/>} />
                                   <Route path="/products/" element={<ManageProducts />} />
                            </Routes>
                     </SidebarWithHeader>
              </>);
       }else{
              return <h1>LOADING</h1>
       }
};

export default Dashboard;