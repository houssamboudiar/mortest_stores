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
  readonly selectedSpoint: ISellingPoint;
  readonly loading: boolean;
}

// Define the initial state
const initialSPState: ISellingPointState = {
    spoints: [],
    selectedSpoint: {
      name : "Selling Point",
      societé : "string",
      adress : "undefined",
      wilaya : "undefined",
      ville : "undefined",
      telephone : 0,
      fax : 0,
      email : "undefined",
      articles_dimposition : "undefined"
    },
    loading: false
};

export const spointReducer: Reducer<ISellingPointState, AnyAction> = (
  state = initialSPState, action: any 
) => {
  switch (action.type) {
    case SpointActionTypes.LOADING_SPOINTS: {
      return {
        ...state,
        ...initialSPState,
        loading: true
      };
    }
    case SpointActionTypes.GET_ALL_Spoints: {
      return {
        ...state,
        spoints: action.spoints,
        selectedSpoint: action.spoints[0],
        loading: false
      };
    }
    case SpointActionTypes.SET_Spoint: {
      return {
        ...state,
        spoints: action.spoints,
        selectedSpoint: action.selectedSpoint,
        loading: false
      };
    }
    default:
      return state;
  }
};