import * as Types from './ProductActionTypes';
import * as API from '../../Shared/API/API';

export const ProductListInitiatedAC = () => {
    return {
        type: Types.SHOPPING_GET_PRODUCT_LIST_INITIATED,
        productState: {
            productAPICallState: {
                requesting: true,
                requestError: null
            }
        }
    };
};

export const ProductListFailedAC = (err) => {
    return {
        type: Types.SHOPPING_GET_PRODUCT_LIST_FAILED,
        productState: {
            productAPICallState: {
                requesting: false,
                requestError: err
            }
        }
    };
};

export const ProductListSucceededAC = (productList) => {
    return {
        type: Types.SHOPPING_GET_PRODUCT_LIST_SUCCEEDED,
        productState: {
            productAPICallState: {
                requesting: false
            },
            productDetailState: productList
        }
    };
};

export const getProductList = (vendorParams,jwt) => async (dispatch) => {
    dispatch(ProductListInitiatedAC());
    try {
        const productList = await API.getProductList(vendorParams, jwt);
        dispatch(ProductListSucceededAC(productList));
    } catch (e) {
        dispatch(ProductListFailedAC(e));
    }
};

export const setSelectedProductAC = (product) => {
    return {
        type: Types.SHOPPING_SET_PRODUCT_SELECTED,
        productState: {
            selectedProductDetailState: product 
        }
    };
};

export const setProductFilterAC = (filter) => {
    return {
        type: Types.SHOPPING_SET_PRODUCT_FILTER,
        productState: {
            filterCategory: filter 
        }
    };
};

export const setSelectedProduct = (selectedProduct) => dispatch => dispatch(setSelectedProductAC(selectedProduct));

export const setProductFilter = (filter) => dispatch => dispatch(setProductFilterAC(filter));

export const makeKafkaCall = (kafkaInfo) => {
    API.kafkaLogProductEvents(kafkaInfo);
    return { type: Types.SHOPPING_KAFKA_PRODUCT_CALL };
};