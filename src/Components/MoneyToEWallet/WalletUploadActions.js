import * as API from '../../Shared/API/API';
import * as AC from './WalletUploadActionCreators';

export const addMoney = (value) => (dispatch) => dispatch(AC.addMoneyAC(value));

export const clearAddMoney = () => (dispatch) => dispatch(AC.clearAddMoneyAC());

export const clearLoading = () => (dispatch) => dispatch(AC.clearLoadingAC());

export const setLoading = () => (dispatch) => dispatch(AC.setLoadingAC());

export const setCardNumber = (value) => (dispatch) => dispatch(AC.setCardNumberAC(value));

export const setCardExpiry = (value) => (dispatch) => dispatch(AC.setCardExpiryAC(value));

export const setCardCVV = (value) => (dispatch) => dispatch(AC.setCardCVVAC(value));

export const walletBalance = (userId, jwt) => async (dispatch) => {
    dispatch(AC.WalletLoadInitiatedAC());
    try {
        const wallet = await API.getUsersWallet(userId, jwt);
        dispatch(AC.WalletLoadSucceededAC(wallet));
    } catch (e) {
        dispatch(AC.WalletLoadFailedAC(e));
    }
};

export const walletTopUp = (userId, saleDetails ,jwt) => async (dispatch) => {

    dispatch(AC.WalletTopUpInitiatedAC());
    try {
        await API.walletTopUpViaSale(userId, saleDetails, jwt);
        dispatch(AC.WalletTopUpSucceededAC());
    } catch (e) {
        dispatch(AC.WalletTopUpFailedAC(e));
    }
};