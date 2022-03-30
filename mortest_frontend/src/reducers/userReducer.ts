// Import Reducer type
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnyAction, Reducer } from 'redux';
import { ErrorActionTypes } from '../actions/errorActions';
import { UserActions, UserActionTypes} from '../actions/userActions';

export interface IUser {
       id:number,
       username:string,
       token:string,
       credentials:{
              access:string,
              refresh:string
       },
}

export interface IUserState {
       readonly user: IUser;
       loading: boolean,
       authenticated: boolean,
}

// Define the initial state
const initialUserState: IUserState = {
       user: {
              id:0,
              username:'Undefined',
              token:'',
              credentials:{
                     access:'',
                     refresh:''
              },
       },
       authenticated: false,
       loading: false
};

export const  userReducer: Reducer<IUserState, AnyAction> = (state=initialUserState,  action: any) => {
       switch (action.type) {
              case UserActionTypes.SET_AUTHENTICATED:
                     return {
                            ...state,
                            user: state.user,
                            loading: false,
                            authenticated: true,
                     };
              case UserActionTypes.SET_UNAUTHENTICATED:
                     return initialUserState;
              case UserActionTypes.SET_USER:
                     return {
                            user: action.user[0],
                            loading: false,
                            authenticated: true,
                     };
              case UserActionTypes.LOADING_USER:
                     return {
                            ...initialUserState,
                            loading: true,
                            authenticated: false,
                     };
              case ErrorActionTypes.SET_ERRORS:
                     return {
                            ...state,
                            error: action.payload,
                     };
              default:
                     return state;
       }
};