import InitialState from '../../Shared/State/InitialState';
import * as Types from './WalletToWalletActionTypes';
import * as P2PTypes from '../PayToPerson/PayToPersonActionTypes';

export default (state = InitialState.walletToWalletState, action) => {
    switch (action.type) {
    case P2PTypes.P2P_AMOUNT_CHANGED: 
    case P2PTypes.P2P_DESCRIPTION_CHANGED:
    case P2PTypes.P2P_PAYMENT_INITIATED:
    case P2PTypes.P2P_PAYMENT_SUCCEEDED:
    case P2PTypes.P2P_PAYMENT_FAILED:
        return {
            ...state,
            paymentInfo: {
                ...state.paymentInfo,
                ...action.paymentInfo
            }
        };
    case Types.WALLET_TO_WALLET_DETAILS:
    case Types.ON_SCAN_START:
    case Types.ON_PAY_START:
    case Types.ON_SCAN_SUCCESS:
    case Types.ON_PAY_SUCCESS:
    case Types.ON_SCAN_FAILURE:
    case Types.ON_PAY_FAILURE:
        return {
            ...state,
            userInfo: { 
                ...state.userInfo, 
                ...action.walletToWalletState.userInfo 
            } 
        };
    default:
        return state;
    }
};