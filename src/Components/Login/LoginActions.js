import * as Types from './LoginActionTypes';
import InitialState from '../../Shared/State/InitialState';
import * as API from '../../Shared/API/API';

export const clearLoginDetailStateAC = () => {
    return {
        type: Types.CLEAR_LOGIN_DETAILS,
        loginState: InitialState.loginState
    };
};

export const clearContactDetailState = () => dispatch => dispatch(clearLoginDetailStateAC());

export const passwordChangedAC = (password) => {
    return {
        type: Types.LOGIN_PASSWORD_CHANGE,
        loginState: {
            password
        }
    };
};

export const changePassword = (password) => {
    return (dispatch) => {
        dispatch(passwordChangedAC(password));
    };
};

export const emailChangedAC = (email) => {
    return {
        type: Types.LOGIN_EMAIL_CHANGE,
        loginState: {
            email
        }
    };
};

export const changeEmail = (email) => {
    return (dispatch) => {
        dispatch(emailChangedAC(email));
    };
};

export const getUserInfoByUsernameBeginAC = () => {
    return {
        type: Types.LOGIN_GET_USER_INFO_BY_USERNAME_BEGIN,
        loginState: {
            loadingUserInfo: true
        }
    };
};

export const getUserInfoByUsernameSuccessAC = (userInfo) => {
    const userIndex = 0;
    return {
        type: Types.LOGIN_GET_USER_INFO_BY_USERNAME_SUCCESS,
        loginState: {
            userInfo,
            userId: userInfo[userIndex].userId,
            loadingUserInfo: false 
        }
    };
};

export const getUserInfoByUsernameFailureAC = (error) => {
    return {
        type: Types.LOGIN_GET_USER_INFO_BY_USERNAME_FAILURE,
        loginState: {
            loadingUserInfoError: error,
            loadingUserInfo: false

        }
    };
};

export const getUserInfoByUsername = (username, jwt) => async (dispatch) =>{
    dispatch(getUserInfoByUsernameBeginAC());
    const usernameObj = { 
        offset: '0',
        limit: '50',
        identity: username 
    };
    try {
        const userInfo = await API.getUserByUsername(usernameObj, jwt);
        dispatch(getUserInfoByUsernameSuccessAC(userInfo.data));
        return true;
    } catch (e) {
        dispatch(getUserInfoByUsernameFailureAC(e.message));
    }
};

export const loginBeginAC = () => {
    return {
        type: Types.LOGIN_SUBMIT_BEGIN,
        loginState: {
            loading: true,
            loggedIn: false
        }
    };
};

export const loginFailureAC = (error) => {
    return {
        type: Types.LOGIN_FAILURE,
        loginState: {
            loading: false,
            error
        }
    };
};

export const loginSuccessAC = (data) => {
    return {
        type: Types.LOGIN_SUCCESS,
        loginState: {
            jwt: data.headerValue,
            spreeJwt: data.spreeHeaderValue,
            loading: false,
            error: null,
            loggedIn: true
        }
    };
};

export const secureLogin = (loginData) => async (dispatch) => {
    dispatch(loginBeginAC());
    try {
        const request = await API.userLogin(loginData);
        dispatch(loginSuccessAC(request.data));
        return request.data;
    } catch (e) {
        dispatch(loginFailureAC(e.message));
    }
    return null;
};

export const logoutAC = () => {
    return {
        type: Types.LOGIN_OFF,
        loginState: {
            jwt: null,
            loggedIn: false
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch(logoutAC());
    };
};