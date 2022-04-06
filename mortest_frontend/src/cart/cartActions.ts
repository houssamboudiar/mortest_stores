// Import redux types
import { ActionCreator, AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import { IProduct, IProductState, ISPFamilleMarqueProduct, ISPFamilleMarqueProductState } from '../product/productReducer';
import { store, useTypedSelector } from '../store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICartState, IItem } from './cartReducers';

// Create Action Constants
export enum CartActionTypes {
       REMOVE_ITEM = "REMOVE_ITEM",
       EDIT_ITEM = "EDIT_ITEM",
       ADD_ITEM = "ADD_ITEM"
}

export type CartActions = AnyAction;

// Add item to cart
export const addItem = (item:IItem) => {
       let cartItems = store.getState().cartState.items;
       let index = cartItems.findIndex(addedItem => addedItem.item.id === item.item.id);
       if(index!=-1){
              cartItems[index].qty = cartItems[index].qty + 1;
              cartItems[index].price = cartItems[index].price + cartItems[index].item.prix_U_achat;
       }else{
              cartItems = [...cartItems,{...item}]
       }
       return (dispatch: Dispatch) => {
              dispatch({type:CartActionTypes.ADD_ITEM,payload:cartItems})
       };
};

export const removeItem = (item:IItem) => {
       let cartItems = store.getState().cartState.items;
       let index = cartItems.findIndex(removedItem => removedItem.item.id === item.item.id);
       if(cartItems[index].qty>1){
              cartItems[index].qty = cartItems[index].qty - 1;
              cartItems[index].price = cartItems[index].price - cartItems[index].item.prix_U_achat;
       }else{
              cartItems = store.getState().cartState.items.filter(removedItem=>removedItem.item.id!=item.item.id);
       }
       return (dispatch: Dispatch) => {
              dispatch({type:CartActionTypes.REMOVE_ITEM,payload:cartItems})
       };
};
