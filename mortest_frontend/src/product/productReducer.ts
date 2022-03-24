// Import Reducer type
import { AnyAction, Reducer } from 'redux';
import { ProductActions, ProductActionTypes, SPFamilleMarqueProductActionTypes} from './productActions';

// Define the Character type
export interface IProduct {
    selling_point: number,
    reference: number,
    article: string,
    img: null,
    unit: number,
    famille: number,
    marque: number,
    prix_U_achat: number,
    prix_detail: number,
    prix_vente_gros: number,
    prix_vente_revendeur: number,
    prix_vente_autre: number,
    stock_alerte: null,
    stock_actuel: null,
    qtte: null,
    ancien_prix: null,
    marge_vente_detail: number,
    marge_vente_grossiste: number,
    marge_vente_revendeur: number,
    marge_vente_autre: number
}

export interface ISPFamilleMarqueProduct {
  selling_point: [],
  famille: [],
  marque: [],
}

// Define the Character State
export interface IProductState {
  readonly products: IProduct[];
  readonly loading: boolean;
  readonly next: any;
  readonly previous: any;
  readonly count: any;
}

export interface ISPFamilleMarqueProductState {
  readonly selling_point: [],
  readonly famille: [],
  readonly marque: [],
  readonly loading: boolean;
}

// Define the initial state
const initialProductState: IProductState = {
    products: [],
    loading:true,
    next: '',
    previous: null,
    count: null,
};

// Define the initial state
const initialISPFamilleMarqueProductState: ISPFamilleMarqueProductState = {
  selling_point: [],
  famille: [],
  marque: [],
  loading: true
};

export const productReducer: Reducer<IProductState, AnyAction> = (
  state = initialProductState, action: any 
) => {
  switch (action.type) {
    case ProductActionTypes.LOADING_PRODUCTS:
      return {
            ...state,
            ...initialProductState,
            loading: true
      };
    case ProductActionTypes.LOAD_PAGE: {
      return {
        ...state,
        products: [...state.products, ...action.products],
        next:action.next,
        previous:action.previous,
        count:action.count,
        loading: false
      };
    }
    case ProductActionTypes.GET_ALL_PRODUCTS: {
      return {
        ...state,
        products: action.products,
        loading: false,
        next:action.next,
        previous:action.previous,
        count:action.count,
      };
    }
    default:
      return state;
  }
};

export const SPFamilleMarqueReducer: Reducer<ISPFamilleMarqueProductState, AnyAction> = (
  state = initialISPFamilleMarqueProductState, action: any 
) => {
  switch (action.type) {
    case SPFamilleMarqueProductActionTypes.LOAD_SPFamilleMarque:
      return {
            ...state,
            ...initialISPFamilleMarqueProductState,
            loading: true
    };
    case SPFamilleMarqueProductActionTypes.GET_SPFamilleMarque :
      return {
        ...state,
        selling_point: action.selling_point,
        famille: action.famille,
        marque: action.marque,
        loading: false,
    };
    default:
      return state;
  }
};