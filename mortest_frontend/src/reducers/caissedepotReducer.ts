// Import Reducer type
import { AnyAction, Reducer } from 'redux';
import { CaisseActionTypes, DepotActionTypes, SellingPointActions, SpointActionTypes} from '../actions/spActions';

// CAISSE

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

// DEPOT

// Define the Character type
export interface IDepot {
  id : number,
  nom : string,
  adresse : string,
  selling_point_id : string,
}

// Define the Character State
export interface IDepotState {
  readonly depots: IDepot[];
  readonly selectedDepot: IDepot;
  readonly loading: boolean;
}

// Define the initial state
const initialDepotState: IDepotState = {
  depots: [],
  selectedDepot: {
    id : 0,
    nom : "Depots",
    adresse : "undefined",
    selling_point_id : "undefined",
  },
  loading: false
};

export const depotReducer: Reducer<IDepotState, AnyAction> = (
  state = initialDepotState, action: any 
) => {
  switch (action.type) {
    case DepotActionTypes.LOADING_DEPOTS: {
      return {
        ...state,
        ...initialDepotState,
        loading: true
      };
    }
    case DepotActionTypes.GET_ALL_DEPOTS: {
      return {
        ...state,
        depots: action.depots,
        selectedCaisse: action.depots[0],
        loading: false
      };
    }
    case DepotActionTypes.SET_DEPOT: {
      return {
        ...state,
        depots: action.depots,
        selectedCaisse: action.selectedCaisse,
        loading: false
      };
    }
    default:
      return state;
  }
};