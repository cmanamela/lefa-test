import InitialState from '../../Shared/State/InitialState';
import * as Types from './BalanceActionTypes';

export default (state = InitialState.balanceRequestState, action) => {
    switch (action.type) { 
    case Types.FETCH_BALANCE_BEGIN:
    case Types.FETCH_BALANCE_SUCCESS:
    case Types.FETCH_BALANCE_FAIL:
        return {
            ...state, 
            ...action.balanceRequestState
        };  
    default:
        return state;
    }
}; 