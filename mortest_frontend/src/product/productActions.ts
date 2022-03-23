// Import redux types
import { ActionCreator, AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import { IProduct, IProductState, ISPFamilleMarqueProduct, ISPFamilleMarqueProductState } from '../product/productReducer';
import { useTypedSelector } from '../store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Create Action Constants

export enum ProductActionTypes {
  GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS",
  LOADING_PRODUCTS = "LOADING_PRODUCTS",
  LOAD_PAGE = "LOAD_PAGE",
}

export enum SPFamilleMarqueProductActionTypes {
  GET_SPFamilleMarque = "GET_SPFamilleMarque",
  LOAD_SPFamilleMarque = "LOAD_SPFamilleMarque",
}

// Interface for Get All Action Type
export interface IProductGetAllAction {
  type: ProductActionTypes.GET_ALL_PRODUCTS;
  products: IProduct[];
}

export interface IProductGetSPFamilleMarqueAction {
  type: SPFamilleMarqueProductActionTypes.GET_SPFamilleMarque;
  info: ISPFamilleMarqueProduct;
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type ProductActions = IProductGetAllAction | IProductGetSPFamilleMarqueAction | AnyAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllProducts: ActionCreator<ThunkAction<Promise<any>, IProductState, null, IProductGetAllAction>> = () => {
  const { user } = useTypedSelector((state) => state.userState);
  return async (dispatch: Dispatch) => {
    try {
      axios.defaults.headers.common = {'Authorization': `Bearer ${user[0].credentials.access}`}
      const response = await axios.get('http://127.0.0.1:8000/api/produit_get_post');
      dispatch({
        products: response.data,
        type: ProductActionTypes.GET_ALL_PRODUCTS,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const { user } = useTypedSelector((state) => state.userState);
  axios.defaults.headers.common = {'Authorization': `Bearer ${user[0].credentials.access}`}
  const response = await axios.get('http://127.0.0.1:8000/api/produit_get_post');
  console.log(response.data)
  return response.data
})

export const loadProduct: ActionCreator<ThunkAction<Promise<any>, IProductState, null, IProductGetAllAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      let access = localStorage.getItem('access token') as string ;
      axios.defaults.headers.common = {'Authorization': `Bearer ${access}`}
      const response = await axios.get('http://127.0.0.1:8000/api/produit_get_post');
      dispatch({
        products: response.data.results,
        next:response.data.next,
        previous:response.data.previous,
        count:response.data.count,
        type: ProductActionTypes.GET_ALL_PRODUCTS,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getProductPage: ActionCreator<ThunkAction<Promise<any>, IProductState, null, IProductGetAllAction>> = (url:string) => {
  return async (dispatch: Dispatch) => {
    try {
      let access = localStorage.getItem('access token') as string ;
      axios.defaults.headers.common = {'Authorization': `Bearer ${access}`}
      const response = await axios.get(url);
      dispatch({
        products: response.data.results,
        next:response.data.next,
        previous:response.data.previous,
        count:response.data.count,
        type: ProductActionTypes.LOAD_PAGE,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getSPFamilleMarque: ActionCreator<ThunkAction<Promise<any>, ISPFamilleMarqueProductState, null, IProductGetSPFamilleMarqueAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      let access = localStorage.getItem('access token') as string ;
      axios.defaults.headers.common = {'Authorization': `Bearer ${access}`}
      const sp = await axios.get('http://127.0.0.1:8000/api/sp_get_post');
      const famille = await axios.get('http://127.0.0.1:8000/api/famille_get_post');
      const marque = await axios.get('http://127.0.0.1:8000/api/marque_get_post');

      dispatch({
        selling_point: sp.data,
        famille: famille.data,
        marque: marque.data,
        type: SPFamilleMarqueProductActionTypes.GET_SPFamilleMarque,
      });
    } catch (err) {
      console.error(err);
    }
  };
};