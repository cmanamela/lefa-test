import * as Types from './PaymentActionsTypes';
import InitialState from '../../Shared/State/InitialState';

export default (state = InitialState.paymentOptionsState , action) => {
    switch (action.type) {
    case Types.PAYMENT_OPTIONS_CHANGE_MODE:
    case Types.PAYMENT_OPTIONS_PROCESS_SET_ORDER_NUMBER:
    case Types.PAYMENT_OPTIONS_PROCESS_SALE_INITIATED:
    case Types.PAYMENT_OPTIONS_PROCESS_SALE_SUCCESS:
    case Types.PAYMENT_OPTIONS_PROCESS_SALE_FAILURE:
        return {
            ...state,
            ...action.paymentOptionsState
        };
    default:
        return state;
    }
};