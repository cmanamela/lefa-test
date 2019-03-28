import InitialState from '../../Shared/State/InitialState';
import * as Types from './ProductActionTypes';

export default (state = InitialState.productState, action) => {
    switch (action.type){
    case Types.SHOPPING_GET_PRODUCT_LIST_INITIATED:
    case Types.SHOPPING_GET_PRODUCT_LIST_FAILED:
        return {
            ...state,
            productAPICallState: {
                ...state.productAPICallState,
                ...action.productState.productAPICallState
            }
        };
        
    case Types.SHOPPING_GET_PRODUCT_LIST_SUCCEEDED:   
        return {
            ...state,
            productAPICallState: {
                ...state.productAPICallState,
                ...action.productState.productAPICallState
            },
            productDetailState: action.productState.productDetailState
        };

    case Types.SHOPPING_SET_PRODUCT_SELECTED:   
        return {
            ...state,
            selectedProductDetailState: {
                ...state.selectedProductDetailState,
                ...action.productState.selectedProductDetailState
            }
        };        

    case Types.SHOPPING_SET_PRODUCT_FILTER:   
        return {
            ...state,
            filterCategory: action.productState.filterCategory            
        }; 

    default:
        return state;
    }
};