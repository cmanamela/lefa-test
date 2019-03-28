import InitialState from '../../Shared/State/InitialState';
import * as Types from './OrderHistoryActionTypes';

export default (state = InitialState.orderHistoryState, action) => {
    switch (action.type) {
    case Types.GET_ORDER_HISTORY_VERIFY_INITIATED:
    case Types.GET_ORDER_HISTORY_REQUEST_FAILED:
        return {
            ...state,
            orderAPICallState: {
                ...state.orderAPICallState,
                ...action.orderHistoryState.orderAPICallState
            }
        };
    case Types.GET_ORDER_HISTORY_VERFIY_SUCCEEDED:
        return {
            ...state,
            orderAPICallState: {
                ...state.orderAPICallState,
                ...action.orderHistoryState.orderAPICallState
            },
            orderHistory: action.orderHistoryState.orderHistory
        };
    case Types.SET_SELECTED_INDEX:
        return {
            ...state,
            index: action.orderHistoryState.index
        };
    default:
        return state;
    }
};