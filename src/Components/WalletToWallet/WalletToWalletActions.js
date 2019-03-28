import * as Types from './WalletToWalletActionTypes';
import * as API from '../../Shared/API/API';

export const userInfonoChangedAC = (userInfo) => {
    return {
        type: Types.WALLET_TO_WALLET_DETAILS,
        walletToWalletState: {
            userInfo
        }
    };
};
export const userInfoFail = (error) => {
    return {
        type: Types.WALLET_TO_WALLET_DETAILS,
        walletToWalletState: {
            error
        }
    };
};

export const changeScanStart = () => {
    return {
        type: Types.ON_SCAN_START,
        walletToWalletState: {
            userInfo: {
                openScanner: true
            }
        }

    };
};

export const changeEmail = (email) => {
    return {
        type: Types.ON_SCAN_START,
        walletToWalletState: {
            userInfo: {
                email
            }
        }

    };
};

export const changeScanSuccess = (userInfo) => {
    return {
        type: Types.ON_SCAN_SUCCESS,
        walletToWalletState: {
            userInfo
        }

    };
};

export const changeScanFailure = (error) => {
    return {
        type: Types.ON_SCAN_FAILURE,
        walletToWalletState: {
            userInfo: {
                openScanner: false,
                error
            }
        }

    };
};

export const changeEmailStart = () => {
    return {
        type: Types.ON_PAY_START,
        walletToWalletState: {
            userInfo: {
                openScanner: false
            }
        }

    };
};

export const changeEmailSuccess = (userInfo) => {
    return {
        type: Types.ON_PAY_SUCCESS,
        walletToWalletState: {
            userInfo: userInfo 
        }
    };
};

export const changeEmailFailure = (error) => {
    return {
        type: Types.ON_PAY_FAILURE,
        walletToWalletState: {
            userInfo: {
                openScanner: false,
                error
            }
        }

    };
};

export const changeUserInfo = (userInfo) => {
    return (dispatch) => {
        dispatch(userInfonoChangedAC(userInfo));
    };
};

export const changeScanInfo = () => {
    return (dispatch) => {
        dispatch(changeScanStart());
    };
};
export const changeEmailInfo = (email) => {
    return (dispatch) => {
        dispatch(changeEmail(email));
    };
};

export const changePaymentUserInfo = (userInfo) => {
    return (dispatch) => {
        dispatch(userInfonoChangedAC(userInfo));
    };
};

async function onGetMyDetails(userId,jwt) {
    try {
        const index = 0; 
        const userResult = await API.getUserByID(userId,jwt);
        const walletResult = await API.getUsersWallet(userId,jwt);
    
        return { 
            walletId: walletResult.data[index].friendlyId,
            cellNo: userResult.data.phone1,
            email: userResult.data.email1,
            firstName: userResult.data.firstName,
            middleName: userResult.data.middleName,
            surname: userResult.data.lastName
        };
    } catch (err){
        alert(err);
    }            
}
export const GetMydetails = ( userId,jwt ) => async (dispatch) => {
    try {
        const userData = await onGetMyDetails(userId,jwt);
        dispatch(userInfonoChangedAC(userData));
        return true;
    } catch (e) {
        dispatch(userInfoFail(e)); 
    }

    return false;
};

export const qrScan = ( scannedInfo ) => (dispatch) => {
    dispatch(changeScanStart());
    try {    
        dispatch(changeScanSuccess(scannedInfo));
        return true;
    } catch (e) {
        dispatch(changeScanFailure(e));
        return false;
    }   
};