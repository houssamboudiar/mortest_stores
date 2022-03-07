// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import { ISellingPoint, ISellingPointState } from '../reducers/spReducer';

// Create Action Constants

export enum SpointActionTypes {
       GET_ALL_Spoints = "GET_ALL_Spoints"
}

// Interface for Get All Action Type
export interface ISellingPointsGetAllAction {
  type: SpointActionTypes.GET_ALL_Spoints;
  spoints: ISellingPoint[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type SellingPointActions = ISellingPointsGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllSpoints: ActionCreator<
  ThunkAction<Promise<any>, ISellingPointState, null, ISellingPointsGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/sp_get_post');
      dispatch({
        products: response.data,
        type: SpointActionTypes.GET_ALL_Spoints,
      });
    } catch (err) {
      console.error(err);
    }
  };
};