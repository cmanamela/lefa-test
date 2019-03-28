import * as Types from './BalanceActionTypes'; 
import * as API from '../../Shared/API/API';

const firstIndex = 0;
export const fetchBalanceBegin = () => ({
    type: Types.FETCH_BALANCE_BEGIN,
    balanceRequestState: {
        balance: null,
        requesting: true,
        requestError: null
    }
});

export const fetchBalanceSuccess = (balanceDetail) => ({
    type: Types.FETCH_BALANCE_SUCCESS,
    balanceRequestState: {
        requesting: false,
        balance: balanceDetail.data[firstIndex].currentBalance,
        walletId: balanceDetail.data[firstIndex].walletId,
    }
});

export const fetchBalanceFailure = (error) => ({
    type: Types.FETCH_BALANCE_FAIL,
    balanceRequestState: {
        requesting: false,
        requestError: error
    }
});

export const RequestBalance = (userID, jwt) => async (dispatch) => {
    dispatch(fetchBalanceBegin()); 
    try { 
        const response = await API.getUsersWallet(userID, jwt);   
        dispatch(fetchBalanceSuccess(response));
    } catch (e) { 
        dispatch(fetchBalanceFailure(e)); 
    }
};