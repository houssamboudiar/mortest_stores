import { GET_PRODUCTS } from "../actions/type.js";

const initialstate = {
    products: []
}

export default function(state = initialstate, action) {
    switch(action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                proucts: action.payload
            };
        default:
            return state;
    }
}