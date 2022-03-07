// Import redux types
import { ActionCreator, AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { Route } from "react-router-dom";
import parseJwt from "../utils/utils";
// Import Character Typing
import { IUser, IUserState } from '../reducers/userReducer';
import store from '../store/store';
import { useNavigate } from 'react-router-dom';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { string } from 'prop-types';
import { useToast } from '@chakra-ui/react';
import { ErrorActionTypes } from './errorActions';
// Create Action Constants
export enum UserActionTypes {
       SET_AUTHENTICATED = "SET_AUTHENTICATED",
       SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED",
       SET_USER = "SET_USER",
       LOADING_USER = "LOADING_USER",
       SET_ERRORS = "SET_ERRORS",
       LOADING_UI = "LOADING_UI",
       CLEAR_ERRORS = "CLEAR_ERRORS"
}

// Interface for SET AUTHENTICATED Action Type
export interface IUserLoginAction {
       type: UserActionTypes.SET_AUTHENTICATED;
       user: IUser[];
       error: any;
}

// Interface for SET UNAUTHENTICATED Action Type
export interface IUserLogoutAction {
       type: UserActionTypes.SET_UNAUTHENTICATED;
       user: IUser[];
}

// Interface for SET_AUTHENTICATED Action Type
export interface IUserGetData {
       type: UserActionTypes.SET_USER;
       user: IUser[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type UserActions = IUserLoginAction | IUserGetData | IUserLogoutAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const userLogin: ActionCreator<ThunkAction<Promise<any>, IUserState, null, AnyAction>> = (username:string, password:string) => {

       return async (dispatch: Dispatch) => {
              try {
                     dispatch({ type: UserActionTypes.LOADING_UI })
                     axios.post('http://127.0.0.1:8000/api/token/', { username:username, password:password})
                     .then((res) => {
                            dispatch({ 
                                   type: UserActionTypes.LOADING_USER,
                                   user: [{
                                          loading: true,
                                   }]
                            });
                            localStorage.setItem('access token', res.data.access); //setting token to local storage
                            localStorage.setItem('refresh token', res.data.refresh); //setting token to local storage
                            axios.defaults.headers.common = {'Authorization': `Bearer ${res.data.access}`}
                            let access = localStorage.getItem('access token') as string ;
                            let refresh = localStorage.getItem('refresh token') as string ;
                            const userData = parseJwt(access);
                            const userD =  [{
                                   id: userData.user_id,
                                   username:'Undefined',
                                   authenticated: true,
                                   loading: false,
                                   credentials:{
                                          access:access,
                                          refresh:refresh,
                                   }
                            }]
                            dispatch({
                                   type: UserActionTypes.SET_USER,
                                   user: userD
                            }); 
                            dispatch({ type: UserActionTypes.CLEAR_ERRORS });
                            return userD                         
                     }).catch((err) => {
                            dispatch({
                                   type: ErrorActionTypes.SET_ERRORS,
                                   payload: err.response.status,
                            });
                            return err 
                     });
              } catch (err) {
                     return err 
              }
       };
};

//for fetching authenticated user information
export const getUserData: ActionCreator<ThunkAction<Promise<any>, IUserState, null, IUserGetData>> = () => {
       return async (dispatch: Dispatch) => {
              try{
                     dispatch({ 
                            type: UserActionTypes.LOADING_USER,
                            user: [{
                                   loading: true,
                            }]
                     });
                     if(localStorage.getItem('access token')==null){
                            dispatch({
                                   type: UserActionTypes.SET_UNAUTHENTICATED,
                            });
                     }else{
                            let access = localStorage.getItem('access token') as string ;
                            let refresh = localStorage.getItem('refresh token');
                            const userData = parseJwt(access);
                            dispatch({
                                   type: UserActionTypes.SET_USER,
                                   user: [{
                                          id: userData.user_id,
                                          username:'Undefined',
                                          authenticated: true,
                                          loading: false,
                                          credentials:{
                                                 access:access,
                                                 refresh:refresh,
                                          }
                                   }]
                            });
                     }
              }catch(err){
                     console.log(err)
              }
       };
};

export const userLogout: ActionCreator<ThunkAction<Promise<any>, IUserState, null, IUserLogoutAction>> = () => {
       return async (dispatch: Dispatch) => {
              try{
                     localStorage.removeItem('access token');
                     localStorage.removeItem('refresh token');
                     delete axios.defaults.headers.common['Authorization']
                     dispatch({
                            type: UserActionTypes.SET_UNAUTHENTICATED
                     });
                     //window.location.href = '/login'; //redirect to login pag
                     return true
              }catch(err){
                     console.log(err)
                     return false
              }
       };
};

