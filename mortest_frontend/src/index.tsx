import * as React from 'react'
import App from './components/App';
// 1. Import the extendTheme function
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { theme as defaultTheme } from "@chakra-ui/react"
import ReactDOM from 'react-dom';
import * as _ from 'lodash';

// 2. Extend the theme to include custom colors, fonts, etc


const theme = {
  ...defaultTheme,
  fonts: {
      body: "Poppins, sans-serif",
      heading: "Poppins, sans-serif",
      mono: "Poppins, sans-serif",
      login :"Indie Flower , sans-serif"
  },
  size: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "28px",
      "4xl": "36px",
      "5xl": "48px",
      "6xl": "64px",
  },
  fontSizes: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "28px",
      "4xl": "36px",
      "5xl": "48px",
      "6xl": "64px",
  },
  fontWeights: {
      normal: 400,
      medium: 500,
      bold: 600,
  },
  lineHeights: {
      normal: "normal",
      none: "1",
      shorter: "1.25",
      short: "1.375",
      base: "1.5",
      tall: "1.625",
      taller: "2",
  },
  letterSpacings: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
  },
  colors: {
      ...defaultTheme.colors,
      
      P1Blue: "#109CF1",
      P1yellow: "#FFB946",
      P1red: "#F7685B",
      P1green: "#2ED47A",
      P2green : "#3b993b",
      P1purple: "#885AF8",
      P2Black: "#192A3E",
      P2TableBlack: "#323C47",
      P2TableGray: "#707683",
      P3DarkBlueText: "#334D6E",
      P3Gray: "#90A0B7",
      P3IconGray: "#C2CFE0",
      P3ReviewGray : "#ddf6ff" ,
      P3White: "#FFFFFF",
      MainBg: "#f5f6f8"
  },
  shadows: {
      sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
      inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
      none: "none",
      sidebar: "1px 0px 10px 0px #C2CFE0",
      navbar: "0px 1.5px 0px 0px #C2CFE0",
      task:"0px 0px 12px 2px #C2CFE0"
  }
}

// Store type from Redux
import { combineReducers, Store } from 'redux';
// Import the store function and state
import configureStore, { IAppState } from './store/store';
import { getAllProducts } from './actions/productActions';
import { Provider, useDispatch } from 'react-redux';
import { getUserData, UserActionTypes, userLogin } from './actions/userActions';

interface IProps {
  store: Store<IAppState>;
}

// Generate the store
const store = configureStore();

const routing = (
                  <Router>
                      <React.StrictMode>
                          <ChakraProvider theme={theme}>
                            <Provider store={store}>
                                <App />
                            </Provider>
                          </ChakraProvider>
                      </React.StrictMode>
                  </Router>);

ReactDOM.render(routing, document.getElementById('root'));
