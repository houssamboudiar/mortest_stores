import * as React from 'react'
import App from './components/App';
// 1. Import the extendTheme function
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import * as _ from 'lodash';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

// Store type from Redux
import { combineReducers, Store } from 'redux';
// Import the store function and state
import configureStore, { IAppState } from './store/store';
import { getAllProducts } from './actions/productActions';
import { productReducer } from './reducers/productReducer';
import { Provider } from 'react-redux';

interface IProps {
  store: Store<IAppState>;
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  productState: productReducer,
});
console.log('Hi')
// Generate the store
const store = configureStore();
store.dispatch(getAllProducts());

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
