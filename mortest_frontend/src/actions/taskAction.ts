// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import { Itask } from '../reducers/taskReducer';

// Create Action Constants

export enum TaskActionTypes {
    SET_DASHBOARD = "SET_DASHBOARD",
}

// Interface for SET_DASHBOARD Type
export interface ITaskSetDashboard {
  type: TaskActionTypes.SET_DASHBOARD;
  task: Itask[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type TaskActions = ITaskSetDashboard;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
// export const setDashboard: ActionCreator<
//   ThunkAction<Promise<any>, IProductState, null, IProductGetAllAction>
// > = () => {
//   return async (dispatch: Dispatch) => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/produit_get_post');
//       dispatch({
//         products: response.data,
//         type: ProductActionTypes.GET_ALL_PRODUCTS,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };