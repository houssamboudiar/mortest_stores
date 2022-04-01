import React, { FC, Fragment, useEffect } from 'react';
import SidebarWithHeader from "./Sidebar";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Dashboard from './Dashboard';
import { useDispatch } from 'react-redux';
import { getUserData } from '../actions/userActions';
import { useTypedSelector } from '../store/store';
import ManageProducts from './containers/Product/ManageProducts';
import MainTask from './MainTask';
import { fetchProducts, getAllProducts, getProductPage, getSPFamilleMarque, loadProduct, ProductActionTypes } from '../product/productActions';
import { getAllSpoints } from '../actions/spActions';
import ManageCounter from './containers/Comptoir/ManageCounter';
  
interface AppProps {
}

const App: React.FC<AppProps> = () => {
  const dispatch = useDispatch();
  dispatch(getUserData())
  dispatch(getSPFamilleMarque())
  dispatch(getAllSpoints())
  return (
            <Fragment>
              <Routes>
                  <Route path={"/"} element={<Dashboard/>}>
                      <Route path="/main/" element={<MainTask/>} />
                      <Route path="/comptoir/" element={<ManageCounter />} />
                      <Route path="/products/" element={<ManageProducts inComptoir={false} />} />
                  </Route>
                  <Route  path={"/login/"} element={<Login/>}></Route>
              </Routes>
            </Fragment>);
}


export default App;
