// Import Reducer type
import { createAsyncThunk } from '@reduxjs/toolkit';
import { any } from 'prop-types';
import { AnyAction, Reducer } from 'redux';
import { ErrorActionTypes } from '../actions/errorActions';
import { UserActions, UserActionTypes} from '../actions/userActions';

export interface IError {
       errorstate: []
}

export interface IErrorState {
       readonly errorstate: number;
}

// Define the initial state
const initialErrorState: IErrorState = {
       errorstate: 0
};

export const  errorReducer: Reducer<IErrorState, AnyAction> = (state=initialErrorState,  action: any) => {
       switch (action.type) {
              case ErrorActionTypes.SET_ERRORS:
                     return {
                            ...state,
                            errorstate: action.payload
                     };
              default:
                     return state;
       }
};