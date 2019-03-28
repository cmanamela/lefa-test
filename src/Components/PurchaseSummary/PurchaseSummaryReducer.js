import * as Types from './PurchaseSummaryActionTypes';
import InitialState from '../../Shared/State/InitialState';

export default (state = InitialState.purchaseSummaryState , action) => {
    switch (action.type) {
    case Types.PURCHASE_SUMMARY_CHANGE_ADDRESS:
    case Types.PURCHASE_SUMMARY_INCREMENT_ITEMS:
    case Types.PURCHASE_SUMMARY_DECREMENT_ITEMS:
    case Types.PURCHASE_SUMMARY_UPDATE_TOTAL:
        return {
            ...state,
            ...action.purchaseSummaryState
        };
    default:
        return state;
    }
};