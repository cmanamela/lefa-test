import * as Types from './PayToPersonActionTypes';
import * as API from '../../Shared/API/API';

export const amountChangedAC = (amount) => {
    return {
        type: Types.P2P_AMOUNT_CHANGED,
        paymentInfo: {
            amount
        }
    };
};

export const descriptionChangedAC = (desc) => {
    return {
        type: Types.P2P_DESCRIPTION_CHANGED,
        paymentInfo: {
            description: desc
        }
    };
};

export const paymentInitiatedAC = () => {
    return {
        type: Types.P2P_PAYMENT_INITIATED,
        paymentInfo: {
            paying: true,
            paymentError: null
        }
    };
};

export const paymentSucceededAC = () => {
    return {
        type: Types.P2P_PAYMENT_SUCCEEDED,
        paymentInfo: {
            paying: false
        }
    };
};

export const PaymentFailedAC = (err) => {
    return {
        type: Types.P2P_PAYMENT_FAILED,
        paymentInfo: {
            paying: false,
            paymentError: err
        }
    };
};

export const changeAmount = (amount) => (dispatch) => {
    dispatch(amountChangedAC(amount));
};

export const changeDescription = (description) => (dispatch) => {
    dispatch(descriptionChangedAC(description));
};

export const submitPayment = (transactionDetails,jwt) => async (dispatch) => {
    dispatch(paymentInitiatedAC());
    try {
        await API.walletToWalletTransfer(transactionDetails,jwt);
        dispatch(paymentSucceededAC());
        return true;
    } catch (err) {
        dispatch(PaymentFailedAC(err));
    }
    return false;
};