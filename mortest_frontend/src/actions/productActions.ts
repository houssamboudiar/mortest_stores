// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import { IProduct, IProductState } from '../reducers/productReducer';

// Create Action Constants

export enum ProductActionTypes {
    GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"
}

// Interface for Get All Action Type
export interface IProductGetAllAction {
  type: ProductActionTypes.GET_ALL_PRODUCTS;
  products: IProduct[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type ProductActions = IProductGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllProducts: ActionCreator<
  ThunkAction<Promise<any>, IProductState, null, IProductGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
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