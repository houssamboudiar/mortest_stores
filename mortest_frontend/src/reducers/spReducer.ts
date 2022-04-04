// Import Reducer type
import { AnyAction, Reducer } from 'redux';
import { SellingPointActions, SpointActionTypes} from '../actions/spActions';

// Define the Character type
export interface ISellingPoint {
    name : string,
    societé : string,
    adress : string,
    wilaya : string,
    ville : string,
    telephone : number,
    fax : number,
    email : string,
    articles_dimposition : string
}

// Define the Character State
export interface ISellingPointState {
  readonly spoints: ISellingPoint[];
}

// Define the initial state
const initialSPState: ISellingPointState = {
    spoints: [],
};

export const spointReducer: Reducer<ISellingPointState, AnyAction> = (
  state = initialSPState, action: any 
) => {
  switch (action.type) {
    case SpointActionTypes.GET_ALL_Spoints: {
      return {
        ...state,
        spoints: action.spoints,
      };
    }
    default:
      return state;
  }
};