import InitialState from '../../Shared/State/InitialState';
import * as Types from './LoginActionTypes';

export default (state = InitialState.loginState , action) => {
    switch (action.type) {
    case Types.LOGIN_EMAIL_CHANGE:
    case Types.LOGIN_PASSWORD_CHANGE:
    case Types.LOGIN_SUBMIT_BEGIN:
    case Types.LOGIN_SUCCESS:
    case Types.LOGIN_OFF:
    case Types.LOGIN_FAILURE:
    case Types.LOGIN_GET_USER_INFO_BY_USERNAME_BEGIN:
    case Types.LOGIN_GET_USER_INFO_BY_USERNAME_SUCCESS:
    case Types.LOGIN_GET_USER_INFO_BY_USERNAME_FAILURE:
    case Types.CLEAR_LOGIN_DETAILS:
        return {
            ...state,
            ...action.loginState
        };
    case Types.LOGIN_WITH_NEDBANK_MONEY_BEGIN:
    case Types.LOGIN_WITH_NEDBANK_MONEY_SUCCESS:
    case Types.LOGIN_WITH_NEDBANK_MONEY_FAILURE:
    default:
        return state;
    }
};