import InitialState from '../../Shared/State/InitialState';
import * as Types from './ShoppingCartActionTypes';

export default (state = InitialState.cartState, action) => {
    switch (action.type) {
    case Types.CART_CLEAR_LOCAL_ITEMS:
    case Types.CART_CLEAR_ITEMS:
        return {
            ...state,
            ...InitialState.cartState
        };
    case Types.CART_DELETE_LOCAL_ITEM: 
    case Types.CART_ADD_ITEM:
    case Types.CART_ADD_ITEM_START:
    case Types.CART_ADD_ITEM_SUCCESS:
    case Types.CART_ADD_ITEM_FAIL:
    case Types.CART_REMOVE_ITEM_START:
    case Types.CART_REMOVE_ITEM_SUCCESS:
    case Types.CART_REMOVE_ITEM_FAIL:
    case Types.CART_CHANGE_ITEM_QUANTITY:
    case Types.CART_CHANGE_ITEM_QUANTITY_START:
    case Types.CART_CHANGE_ITEM_QUANTITY_SUCCESS:
    case Types.CART_CHANGE_ITEM_QUANTITY_FAIL:
    case Types.CART_GET_ITEMS_BEGIN:
    case Types.CART_GET_ITEMS_SUCCESS:
    case Types.CART_GET_ITEMS_FAILURE:
    case Types.CART_CLEAR_ITEMS_FAILURE:
    case Types.CART_CLEAR_ITEMS_SUCCESS:
    case Types.CART_JINI_GET_ITEMS_SUCCESS:
    case Types.CART_CLEAR_ITEMS_BEGIN:
        return {
            ...state,
            ...action.cartState
        };
    default: 
        return {
            ...state
        };
    }
};