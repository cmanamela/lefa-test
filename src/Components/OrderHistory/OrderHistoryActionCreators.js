import * as Types from './OrderHistoryActionTypes';

export const GetOrderHistoryInitiatedAC = () => {
    return {
        type: Types.GET_ORDER_HISTORY_VERIFY_INITIATED,
        orderHistoryState: {
            orderAPICallState: {
                verifying: true,
                verificationError: null
            }
        }
    };
};

export const GetOrderHistorySucceededAC = (history) => {
    return {
        type: Types.GET_ORDER_HISTORY_VERFIY_SUCCEEDED,
        orderHistoryState: {
            orderAPICallState: { 
                verifying: false,
                verificationError: null
            },
            orderHistory: history
        }
    };
};

export const GetOrderHistoryFailedAC = (err) => {
    return {
        type: Types.GET_ORDER_HISTORY_REQUEST_FAILED,
        orderHistoryState: {
            orderAPICallState: {
                verifying: false,
                verificationError: err
            }
        }
    };
};

export const setSelectedIndexAC = (index) => {
    return {
        type: Types.SET_SELECTED_INDEX,
        orderHistoryState: {
            index 
        }
    };
};