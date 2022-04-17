// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import { ISellingPoint, ISellingPointState } from '../reducers/spReducer';
import { ICaisseState } from '../reducers/caisseReducer';

// Create Action Constants

export enum SpointActionTypes {
  GET_ALL_Spoints = "GET_ALL_Spoints",
  SET_Spoint = "SET_Spoint",
  LOADING_SPOINTS = "LOADING_SPOINTS"
}

export enum  CaisseActionTypes {
  GET_ALL_CAISSES = "GET_ALL_CAISSES",
  SET_CAISSE = "SET_CAISSE",
  LOADING_CAISSES = "LOADING_CAISSES"
}

// Interface for Get All Action Type
export interface ISellingPointsGetAllAction {
  type: SpointActionTypes.GET_ALL_Spoints;
  spoints: ISellingPoint[];
}

// Interface for Get All Action Type
export interface ICaissesGetAllAction {
  type: CaisseActionTypes.GET_ALL_CAISSES;
  spoints: ISellingPoint[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type SellingPointActions = ISellingPointsGetAllAction;
export type CaissesActions = ICaissesGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllSpoints: ActionCreator<
  ThunkAction<Promise<any>, ISellingPointState, null, ISellingPointsGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/sp_get_post');
      dispatch({
        spoints: response.data,
        type: SpointActionTypes.GET_ALL_Spoints,
      });
    } catch (err) {
      console.error(err);
    }
  };
};


/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllCaisses: ActionCreator<
  ThunkAction<Promise<any>, ICaisseState, null, ICaissesGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/caisse_get_post');
      dispatch({
        caisses: response.data,
        type: CaisseActionTypes.GET_ALL_CAISSES,
      });
    } catch (err) {
      console.error(err);
    }
  };
};