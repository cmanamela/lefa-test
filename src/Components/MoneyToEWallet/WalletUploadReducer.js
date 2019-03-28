import InitialState from '../../Shared/State/InitialState';
import * as Types from './WalletUploadActionTypes';

export default (state = InitialState.walletUploadState, action) => {
    switch (action.type) {
    case Types.WALLET_LOAD_AMOUNT:
        return {
            ...state,
            amountToAdd: action.walletUploadState.amountToAdd
        };
    case Types.WALLET_LOAD_CLEAR:
    case Types.WALLET_CLEAR_LOADING:
    case Types.WALLET_SET_LOADING:
        return {
            ...state,
            ...action.walletUploadState
        };
    case Types.CARD_NUMBER:
    case Types.CARD_CVV:
    case Types.CARD_EXPIRY:
        return {
            ...state,
            cardInfoState: {
                ...state.cardInfoState,
                ...action.walletUploadState.cardInfoState
            }
        };
    case Types.WALLET_LOAD_REQUEST_FAILED:
    case Types.WALLET_LOAD_VERIFY_SUCCEEDED:
    case Types.WALLET_LOAD_VERIFY_INITIATED:
        return {
            ...state,
            walletBalanceState: {
                ...state.walletBalanceState,
                ...action.walletUploadState.walletBalanceState
            }
        };
    case Types.WALLET_TOPUP_REQUEST_FAILED:
    case Types.WALLET_TOPUP_VERIFY_SUCCEEDED:
    case Types.WALLET_TOPUP_VERIFY_INITIATED:
        return {
            ...state,
            walletTopUpState: {
                ...state.walletTopUpState,
                ...action.walletUploadState.walletTopUpState
            }
        };    
    default:
        return state;
    }
};