// Import Reducer type
import { AnyAction, Reducer } from 'redux';
import { ClientActionTypes, FVActionTypes } from '../actions/fournisseurclientActions';
import { CaisseActionTypes, DepotActionTypes, SellingPointActions, SpointActionTypes} from '../actions/spActions';

// Client
export interface IClient {
       id: number,
       selling_point: number,
       numero: number,
       etat_civile: string,
       nom: string,
       type: string,
       telephone: string,
       phone_number: string,
       email: string,
       numero_rc: null,
       NRC: null,
       NIS: null,
       RIB: null,
       solde: null,
       wilaya: string,
       ville: string,
       adress: string,
       saisie_le: string,
       modilfié_le: string,
       saisie_par: number
}

// Define the Character State
export interface IClientState {
  readonly clients: IClient[];
  readonly loading: boolean;
}

// Define the initial state
const initialClientState: IClientState = {
     clients: [],
     loading: false
};

export const clientReducer: Reducer<IClientState, AnyAction> = (
  state = initialClientState, action: any 
) => {
  switch (action.type) {
    case ClientActionTypes.LOADING_CLIENTS: {
      return {
        ...state,
        ...initialClientState,
        loading: true
      };
    }
    case ClientActionTypes.GET_ALL_CLIENTS: {
      return {
        ...state,
        clients: action.clients,
        loading: false
      };
    }
    case ClientActionTypes.SET_CLIENT: {
      return {
        ...state,
        clients: action.caisses,
        loading: false
      };
    }
    default:
      return state;
  }
};

export interface IFicheVenteProduit {
    id: number,
    depot:number,
    produit: number,
    quantite: number,
    numero_lot: number,
    prix: number,
    qtteAct: number
}
// Fiches Ventes
export interface IFicheVente {
  id: number,
  type_fiche: string,
  produits: IFicheVenteProduit[],
  selling_point: number,
  client: number,
  type_client: string,
  saisie_le: string,
  modilfié_le: string,
  saisie_par: number,
  modifie_par: null,
  reste_a_payer:number,
  numero: number,
  date: string,
  montant_reg_client: number,
  mode_reglement:number,
  caisse: number,
  observation: string,
  totalachats: number,
  TVA: number,
  timbre: number,
  remise: number,
  montanttva: number,
  montantremise: number,
  prixttc: number
}

// Define the Character State
export interface IFicheVenteState {
readonly fichesVentes: IFicheVente[];
readonly loading: boolean;
}

// Define the initial state
const initialFicheVenteState: IFicheVenteState = {
  fichesVentes: [],
  loading: false
};

export const ficheVenteReducer: Reducer<IFicheVenteState, AnyAction> = (
  state = initialFicheVenteState, action: any 
) => {
  switch (action.type) {
    case ClientActionTypes.LOADING_CLIENTS: {
      return {
        ...state,
        ...initialFicheVenteState,
        loading: true
      };
    }
    case FVActionTypes.GET_ALL_FICHES_VENTES: {
      return {
        ...state,
        fichesVentes: action.fichesVentes,
        loading: false
      };
    }
    default:
      return state;
  }
};

// Fournisseur
