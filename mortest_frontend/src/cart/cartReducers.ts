// Import Reducer type
import { AnyAction, Reducer } from 'redux';
import { IProduct } from '../product/productReducer';
import { CartActionTypes } from './cartActions';

export interface IItem {
       item: IProduct,
       qty:number,
       price:number,
}

// Define the Character State
export interface ICartState {
  readonly items: IItem[];
}

// Define the initial state
const initialCartState: ICartState = {
       items: [],
};

export const cartReducer: Reducer<ICartState, AnyAction> = (state = initialCartState, action: any ) => {
  switch (action.type) {
       case CartActionTypes.ADD_ITEM: {
              return {
                     ...state,
                     items: action.payload,
              };
       }     
       case CartActionTypes.REMOVE_ITEM: {
              return {
                     ...state,
                     items: action.payload,
              };
       }
    default:
      return state;
  }
};