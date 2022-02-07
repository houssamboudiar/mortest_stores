import * as React from 'react'
import App from './components/App';
// 1. Import the extendTheme function
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const routing = (
                  <Router>
                      <React.StrictMode>
                          <ChakraProvider theme={theme}>
                                <App path="/" element={App} />
                          </ChakraProvider>
                      </React.StrictMode>
                  </Router>);

ReactDOM.render(routing, document.getElementById('root'));
