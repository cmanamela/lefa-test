import * as Types from './ShoppingCartActionTypes';
import * as API from '../../Shared/API/API';
import { platformIsSpree } from '../../Shared/Config';

export const addToCartStart = () => {
    return {
        type: Types.CART_ADD_ITEM_START,
        cartState: {
            adding: true,
        }
    };
};

export const addToCartSuccess = (product) => {
    return {
        type: Types.CART_ADD_ITEM_SUCCESS,
        cartState: {
            adding: false,
            addingError: null,
            product
            
        }

    };
};

export const addToCartFail = (error) => {
    return {
        type: Types.CART_ADD_ITEM_FAIL,
        cartState: {
            error,
            adding: false
        }
    };
};

export const removeFromCartStart = () => {
    return {
        type: Types.CART_REMOVE_ITEM_START,
        cartState: {
            removing: true
        }
    };
};

export const removeFromCartSuccess = (cart) => {
    return {
        type: Types.CART_REMOVE_ITEM_SUCCESS,
        cartState: {
            cart: lefaCart(cart),
            removing: false
        }
    };
};

export const removeFromCartFail = (error) => {
    return {
        type: Types.CART_REMOVE_ITEM_FAIL,
        cartState: {
            error,
            removing: false
        }
    };
};

export const changeCartItemStart = () => {
    return {
        type: Types.CART_CHANGE_ITEM_QUANTITY_START,
        cartState: {
            updating: true,           
        }

    };
};

export const changeCartItemSuccess = (cart) => {
    return {
        type: Types.CART_CHANGE_ITEM_QUANTITY_SUCCESS,
        cartState: {
            cart: lefaCart(cart),
            updating: false,
            itemsTotal: cart.included.length,
            total: cart.data.attributes.total
        }

    };
};

export const changeCartItemFail = (error) => {
    return {
        type: Types.CART_CHANGE_ITEM_QUANTITY_FAIL,
        cartState: {
            error,
            updating: false           
        }

    };
};

export const updatedQuantity = (cart) => {
    return {
        type: Types.CART_CHANGE_ITEM_QUANTITY,
        cartState: {   
            cart        
        }
    };
};

export const changeQuantity = (cart) => (dispatch) => {
    dispatch(updatedQuantity(cart));
};

export const addToCart = ( product ) => async (dispatch) => {
    dispatch(addToCartStart());
    try {      
        const reponse = await API.addToCart(product);   
        dispatch(addToCartSuccess(reponse));
    } catch (error) {
        dispatch(addToCartFail(error));
    }

};

export const removeFromCart = ( product ) => async (dispatch) => {
    dispatch(removeFromCartStart());
    try {
        const response = await API.removeItemFromCart(product);
        dispatch(removeFromCartSuccess(response.data));
    } catch (error) {
        dispatch(removeFromCartFail(error));
    }

};

export const changeItemInCart = ( product, spreeJwt ) => async (dispatch) => {
    dispatch(changeCartItemStart());
    try {
        const reponse = await API.changeItemInCart(product, spreeJwt);
        dispatch(changeCartItemSuccess(reponse.data));
        getShoppingCart(spreeJwt);

    } catch (error) {
        dispatch(changeCartItemFail(error));
    }

};

export const deleteFromLocalCartAC = (cart, cartItem) => {
    return {
        type: Types.CART_DELETE_LOCAL_ITEM,
        loginState: {
            cart: cart.filter(item => item.lineItemId !== cartItem.lineItemId)
        }
    };
};

export const clearLocalCartAC = () => {
    return {
        type: Types.CART_CLEAR_LOCAL_ITEMS
    };
};

export const getSpreeCartBeginAC = () => {
    return {
        type: Types.CART_GET_ITEMS_BEGIN,
        cartState: {
            fetching: true,
            fetchingError: null
        }
    };
};

export const getSpreeCartFailureAC = (error) => {
    return {
        type: Types.CART_GET_ITEMS_FAILURE,
        cartState: {
            fetching: false,
            fetchingError: error
        }
    };
};

const lefaCart = (SpreeCart) => { 
    return SpreeCart.included.map(cartItem => ({
        category: null,
        name: cartItem.attributes.name,
        productId: null,
        lineItemId: cartItem.id,
        price: cartItem.attributes.price,
        total: cartItem.attributes.total,
        description: null,
        quantity: cartItem.attributes.quantity,
        serviceProviderId: 1,
        currency: 'ZAR',
        variantId: cartItem.relationships.variant.data.id,
        taxonId: null,
        tax: cartItem.attributes.included_tax_total,
        promo_total: cartItem.attributes.promo_total
    }));
};

export const getSpreeCartSuccessAC = (cart) => {
    return {
        type: Types.CART_GET_ITEMS_SUCCESS,
        cartState: {
            fetching: false,
            fetchingError: null,
            cart: lefaCart(cart),
            itemsTotal: cart.included.length,
            total: cart.data.attributes.total
        }
    };
};

export const getJiniCartAC = () => {
    return {
        type: Types.CART_JINI_GET_ITEMS_SUCCESS,
        cartState: {
            fetching: false,
            fetchingError: null,
            cart: [],
            itemsTotal: 0,
            total: 0
        }
    };
};

export const getShoppingCart = (jwt) => async (dispatch) => {
    if (platformIsSpree()){
        dispatch(getSpreeCartBeginAC());
        try {
            const response = await API.spree_getCart(jwt);
            dispatch(getSpreeCartSuccessAC(response.data));
        } catch (error) {
            dispatch(getSpreeCartFailureAC(error));
        }
    } else {
        dispatch(getJiniCartAC());
    }
    
}; 

export const clearSpreeCartBeginAC = () => {
    return {
        type: Types.CART_CLEAR_ITEMS_BEGIN,
        cartState: {
            clearing: true,
            clearingError: null
        }
    };
};

export const clearSpreeCartFailureAC = (error) => {
    return {
        type: Types.CART_CLEAR_ITEMS_FAILURE,
        cartState: {
            clearing: false,
            clearingError: error
        }
    };
};

export const clearSpreeCartSuccessAC = (data) => {
    return {
        type: Types.CART_CLEAR_ITEMS_SUCCESS,
        cartState: {
            clearing: false,
            clearingError: null,
            itemsTotal: 0,
            total: 0,
            cart: lefaCart(data)
        }
    };
};

export const clearSpreeCart = (jwt) => async (dispatch) => {
    dispatch(clearSpreeCartBeginAC());
    try {
        const response = await API.spree_clearCart(jwt);
        dispatch(clearSpreeCartSuccessAC(response.data));
    } catch (error) {
        dispatch(clearSpreeCartFailureAC(error.message));
    }
};