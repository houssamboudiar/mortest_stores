// Import Reducer type
import { AnyAction, Reducer } from 'redux';
import { CaisseActionTypes, SellingPointActions, SpointActionTypes} from '../actions/spActions';

// Define the Character type
export interface ICaisse {
    id : number,
    nom : string,
    caisse : string,
    wilaya : string,
    ville : string,
}

// Define the Character State
export interface ICaisseState {
  readonly caisses: ICaisse[];
  readonly selectedCaisse: ICaisse;
  readonly loading: boolean;
}

// Define the initial state
const initialCaisseState: ICaisseState = {
    caisses: [],
    selectedCaisse: {
      id : 0,
      nom : "Caisse",
      caisse : "Caisse",
      wilaya : "undefined",
      ville : "undefined",
    },
    loading: false
};

export const caisseReducer: Reducer<ICaisseState, AnyAction> = (
  state = initialCaisseState, action: any 
) => {
  switch (action.type) {
    case CaisseActionTypes.LOADING_CAISSES: {
      return {
        ...state,
        ...initialCaisseState,
        loading: true
      };
    }
    case CaisseActionTypes.GET_ALL_CAISSES: {
      return {
        ...state,
        caisses: action.caisses,
        selectedCaisse: action.caisses[0],
        loading: false
      };
    }
    case CaisseActionTypes.SET_CAISSE: {
      return {
        ...state,
        caisses: action.caisses,
        selectedCaisse: action.selectedCaisse,
        loading: false
      };
    }
    default:
      return state;
  }
};