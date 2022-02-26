// Import Reducer type
import { AnyAction, Reducer } from 'redux';
import { ProductActions, ProductActionTypes} from '../actions/productActions';

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

// Define the Character State
export interface IProductState {
  readonly products: IProduct[];
}

// Define the initial state
const initialProductState: IProductState = {
    products: [],
};

export const productReducer: Reducer<IProductState, AnyAction> = (
  state = initialProductState, action: any 
) => {
  switch (action.type) {
    case ProductActionTypes.GET_ALL_PRODUCTS: {
      return {
        ...state,
        products: action.products,
      };
    }
    default:
      return state;
  }
};