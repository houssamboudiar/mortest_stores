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
import ManageProducts from './containers/Products/ManageProducts';
import MainTask from './MainTask';
import { getAllProducts, getProductPage, getSPFamilleMarque, loadProduct, ProductActionTypes } from '../product/productActions';
import { getAllCaisses, getAllDepots, getAllSpoints } from '../actions/spActions';
import ManageCounter from './containers/Comptoir/ManageCounter';
import { getAllClients, getAllFichesVentes } from '../actions/fournisseurclientActions';
import ManageFicheVentes from './containers/FicheVentes/ManageFicheVentes';
import ManageClients from './containers/Clients/ManageClients';
  
interface AppProps {
}

const App: React.FC<AppProps> = () => {
  const dispatch = useDispatch();
  dispatch(getUserData())
  dispatch(getAllSpoints())
  dispatch(getAllCaisses())
  dispatch(getAllDepots())
  dispatch(getAllClients())
  dispatch(getSPFamilleMarque())
  dispatch(getAllFichesVentes())
  return (
            <Fragment>
              <Routes>
                  <Route path={"/"} element={<Dashboard/>}>
                      <Route path="/main/" element={<MainTask/>} />
                      <Route path="/comptoir/" element={<ManageCounter />} />
                      <Route path="/clients/" element={<ManageClients />} />
                      <Route path="/sales/" element={<ManageFicheVentes />} />
                      <Route path="/products/" element={<ManageProducts inComptoir={false} />} />
                  </Route>
                  <Route  path={"/login"} element={<Login/>}></Route>
              </Routes>
            </Fragment>);
}


export default App;
