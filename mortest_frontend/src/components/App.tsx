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
import { ManageProducts } from './containers/ManageProducts';
import MainTask from './MainTask';
import { getAllProducts } from '../actions/productActions';
  
interface AppProps {
}

const App: FC<AppProps> = ({}) => {

  const dispatch = useDispatch();
  dispatch(getUserData())
  dispatch(getAllProducts())

  return (
            <Fragment>
              <Routes>
                  <Route path={"/"} element={<Dashboard/>}>
                      <Route path="/products/" element={<ManageProducts />} />
                      <Route path="/main/" element={<MainTask/>} />
                  </Route>
                  <Route  path={"/login/"} element={<Login/>}></Route>
              </Routes>
            </Fragment>);
}


export default App;
