/*  Imports from Redux:
 applyMiddleware: Applies middleware to the dispatch method of the Redux store
 combineReducers: Merges reducers into one
 createStore: Creates a Redux store that holds the state tree
 Store: The TS Type used for the store, or state tree
 */
 import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
 import { composeWithDevTools } from '@redux-devtools/extension';
 /*  Thunk
 Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
 */
 import thunk from 'redux-thunk';
 // Import reducers and state type
 import {productReducer, IProductState } from '../reducers/productReducer';

 import {userReducer, IUserState } from '../reducers/userReducer';
 import {errorReducer, IErrorState } from '../reducers/errorReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
 
 // Create an interface for the application state
 export interface IAppState {
    productState: IProductState;
    userState: IUserState;
    errorState: IErrorState;
 }
 
 // Create the root reducer
 const rootReducer = combineReducers<IAppState>({
       productState: productReducer,
       userState: userReducer,
       errorState: errorReducer,
 });

 export const useTypedSelector: TypedUseSelectorHook<IAppState> = useSelector;
 
 // Create a configure store function of type `IAppState`
 export default function configureStore(): Store<IAppState, any> {
   const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
   return store;
 }
