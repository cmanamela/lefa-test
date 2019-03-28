import * as Types from './PaymentActionsTypes';
import * as API from '../../Shared/API/API';

export const changePaymentModeAC = (paymentMode) => {
    return {
        type: Types.PAYMENT_OPTIONS_CHANGE_MODE,
        paymentOptionsState: {
            paymentMode
        }
    };
};
    
export const changePaymentMode = (paymentMode) => dispatch => dispatch(changePaymentModeAC(paymentMode));

export const processSaleBeginAC = () => {
    return {
        type: Types.PAYMENT_OPTIONS_PROCESS_SALE_INITIATED,
        paymentOptionsState: {
            processing: true,
            processingError: null
        }
    };
};
    
export const processSaleFailureAC = (processingError) => {
    return {
        type: Types.PAYMENT_OPTIONS_PROCESS_SALE_FAILURE,
        paymentOptionsState: {
            processing: false,
            processingError
        }
    };
};
    
export const processSaleSuccessAC = (saleDetails) => {
    return {
        type: Types.PAYMENT_OPTIONS_PROCESS_SALE_FAILURE,
        paymentOptionsState: {
            processing: false,
            saleDetails
        }
    };
};

export const submitSale = (walletID, saleDetails,paymentSource, jwt) => async (dispatch) => { 
    dispatch(processSaleBeginAC()); 
    try {  
        const request = await API.createSale(walletID, saleDetails,paymentSource, jwt); 
        dispatch(processSaleSuccessAC(request.data)); 
        return request.data;
    } catch (e) {   
        dispatch(processSaleFailureAC(e.message));
    } 
    return null;
};

export const setOrderNumberAC = (orderNumber) => {
    return {
        type: Types.PAYMENT_OPTIONS_PROCESS_SET_ORDER_NUMBER,
        paymentOptionsState: {
            orderNumber
        }
    };
};
    
export const setOrderNumber = (orderNumber) => dispatch => dispatch(setOrderNumberAC(orderNumber));