import * as Types from './WalletUploadActionTypes';
import InitialState from '../../Shared/State/InitialState';

export const addMoneyAC = (value) => {
    return {
        type: Types.WALLET_LOAD_AMOUNT,
        walletUploadState: {
            amountToAdd: value 
        }
    }; 
};

export const clearAddMoneyAC = () => {
    return {
        type: Types.WALLET_LOAD_CLEAR,
        walletUploadState: {
            amountToAdd: InitialState.walletUploadState.amountToAdd 
        }
    }; 
};

export const setLoadingAC = () => {
    return {
        type: Types.WALLET_SET_LOADING,
        walletUploadState: {
            loading: true
        }
    }; 
};

export const clearLoadingAC = () => {
    return {
        type: Types.WALLET_CLEAR_LOADING,
        walletUploadState: {
            loading: InitialState.walletUploadState.loading 
        }
    }; 
};

export const setCardNumberAC = (value) =>{
    return {
        type: Types.CARD_NUMBER,
        walletUploadState: {
            cardInfoState: {
                cardNumber: value
            }
        }
    };
};

export const setCardExpiryAC = (value) => {
    return {
        type: Types.CARD_EXPIRY,
        walletUploadState: {
            cardInfoState: {
                expiry: value
            }
        }
    };
};

export const setCardCVVAC = (value) => {
    return {
        type: Types.CARD_CVV,
        walletUploadState: {
            cardInfoState: {
                cvv: value
            }
        }
    };
};

export const WalletLoadInitiatedAC = () => {
    return {
        type: Types.WALLET_LOAD_VERIFY_INITIATED,
        walletUploadState: {
            walletBalanceState: {
                verifying: true,
                verificationError: null,
                balance: null
            }
        }
    };
};

export const WalletLoadSucceededAC = (wallet) => {
    const firstIndex = 0;
    return {
        type: Types.WALLET_LOAD_VERIFY_SUCCEEDED,
        walletUploadState: {
            walletBalanceState: {
                verifying: false,
                verificationError: null,
                balance: wallet.data[firstIndex].currentBalance,
                walletId: wallet.data[firstIndex].walletId
            }
        }
    };
};

export const WalletLoadFailedAC = (err) => {
    return {
        type: Types.WALLET_LOAD_REQUEST_FAILED,
        walletUploadState: {
            walletBalanceState: {
                verifying: null,
                verificationError: err,
                balance: null
            }
        }
    };
};

export const WalletTopUpInitiatedAC = () => {
    return {
        type: Types.WALLET_TOPUP_VERIFY_INITIATED,
        walletUploadState: {
            walletTopUpState: {
                verifying: true,
                verificationError: null
            }
        }
    };
};

export const WalletTopUpSucceededAC = () => {
    return {
        type: Types.WALLET_TOPUP_VERFIY_SUCCEEDED,
        walletUploadState: {
            walletTopUpState: {
                verifying: false,
                verificationError: null
            }
        }
    };
};

export const WalletTopUpFailedAC = (err) => {
    return {
        type: Types.WALLET_TOPUP_REQUEST_FAILED,
        walletUploadState: {
            walletTopUpState: {
                verifying: null,
                verificationError: err
            }
        }
    };
};