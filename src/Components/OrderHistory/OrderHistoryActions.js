import * as AC from './OrderHistoryActionCreators.js';
import * as API from '../../Shared/API/API';

export const getOrderHistory = (jwt) => async (dispatch) => {
    dispatch(AC.GetOrderHistoryInitiatedAC());
    try {
        const history = await API.spree_getCompletedOrders(jwt);
        dispatch(AC.GetOrderHistorySucceededAC(history));
    } catch (e) {
        dispatch(AC.GetOrderHistoryFailedAC(e));
    }
};

export const setSelectedIndex = (index) => dispatch => dispatch(AC.setSelectedIndexAC(index));