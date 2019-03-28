import * as Types from './PurchaseSummaryActionTypes';

export const incrementPurchaseItemQuantityAC = (quantity) => {
    return {
        type: Types.PURCHASE_SUMMARY_INCREMENT_ITEMS,
        purchaseSummaryState: {
            quantity
        }
    };
};
    
export const incrementPurchaseItemQuantity = (quantity) => dispatch => dispatch(incrementPurchaseItemQuantityAC(quantity));

export const decrementPurchaseItemQuantityAC = (quantity) => {
    return {
        type: Types.PURCHASE_SUMMARY_DECREMENT_ITEMS,
        purchaseSummaryState: {
            quantity
        }
    };
};
    
export const decrementPurchaseItemQuantity = (quantity) => dispatch => dispatch(decrementPurchaseItemQuantityAC(quantity));

export const updatePurchaseItemTotalAC = (total) => {
    return {
        type: Types.PURCHASE_SUMMARY_UPDATE_TOTAL,
        purchaseSummaryState: {
            total
        }
    };
};

export const updatePurchaseItemTotal = (total) => dispatch => dispatch(updatePurchaseItemTotalAC(total));