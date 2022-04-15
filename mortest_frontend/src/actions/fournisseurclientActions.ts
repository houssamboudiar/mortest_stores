// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import { ISellingPoint, ISellingPointState } from '../reducers/spReducer';
import { ICaisse, ICaisseState, IDepot, IDepotState } from '../reducers/caissedepotReducer';
import { IClient, IClientState, IFicheVente, IFicheVenteState } from '../reducers/fournisseurclientReducer';
import { store } from '../store/store';

// Create Action Constants

export enum ClientActionTypes {
  GET_ALL_CLIENTS = "GET_ALL_CLIENTS",
  SET_CLIENT = "SET_CLIENT",
  LOADING_CLIENTS = "LOADING_CLIENTS",
  ADD_CLIENT = "ADD_CLIENT",
  EDIT_CLIENT = "EDIT_CLIENT",
  DELETE_CLIENT = "DELETE_CLIENT"
}

export enum FVActionTypes {
  GET_ALL_FICHES_VENTES = "GET_ALL_FICHES_VENTES",
}

// Interface for Get All Action Type
export interface IClientGetAllAction {
  type: ClientActionTypes.GET_ALL_CLIENTS;
  clients: IClient[];
}

export interface IFVGetAllAction {
  type: FVActionTypes.GET_ALL_FICHES_VENTES;
  ficheVentes: IFicheVente[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type ClientActions = IClientGetAllAction;
export type FVActions = IFVGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllClients: ActionCreator<
  ThunkAction<Promise<any>, IClientState, null, IClientGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/client_get_post');
      dispatch({
        clients: response.data,
        type: ClientActionTypes.GET_ALL_CLIENTS,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

// Delete Product
export const deleteClient: ActionCreator<ThunkAction<Promise<any>, IClientState, null, IClientGetAllAction>> = (id:number) => {
  return async (dispatch: Dispatch) => {
    try {
      let access = localStorage.getItem('access token') as string ;
      axios.defaults.headers.common = {'Authorization': `Bearer ${access}`};
      const response = await axios.delete(`http://127.0.0.1:8000/api/client_pk/${id}`);
      const clientState = store.getState().clientState;
      const clients = clientState.clients.filter((items)=>{
        return items.id != id
      })
      dispatch({
        clients: clients,
        type: ClientActionTypes.DELETE_CLIENT,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllFichesVentes: ActionCreator<
  ThunkAction<Promise<any>, IFicheVenteState, null, IFVGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/venteclient_get_post ');
      dispatch({
        fichesVentes: response.data,
        type: FVActionTypes.GET_ALL_FICHES_VENTES,
      });
    } catch (err) {
      console.error(err);
    }
  };
};