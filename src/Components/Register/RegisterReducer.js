import InitialState from '../../Shared/State/InitialState';
import * as Types from './RegisterActionTypes';

export default (state = InitialState.registrationState, action) => {
    switch (action.type) {
    case Types.REGISTER_CLEAR_CONTACT_DETAILS:
    case Types.REGISTER_CLEAR_IDENTITY_INFORMATION:
    case Types.REGISTER_CLEAR_VERIFY_OTP:
    case Types.REGISTER_UPDATE_STEP:
        return {
            ...state,
            ...action.registrationState
        };
    case Types.REGISTER_CELLNO_CHANGE:
    case Types.REGISTER_EMAIL_CHANGE:
    case Types.REGISTER_PASSWORD_CHANGE:
        return {
            ...state,
            contactDetailState: {
                ...state.contactDetailState,
                ...action.registrationState.contactDetailState
            }
        };
    case Types.REGISTER_OTP_REQUEST_INITIATED:
    case Types.REGISTER_OTP_REQUEST_SUCCEEDED:
    case Types.REGISTER_OTP_REQUEST_FAILED:
    case Types.REGISTER_OTP_VERIFY_INITIATED:
    case Types.REGISTER_OTP_VERIFY_SUCCEEDED:
    case Types.REGISTER_OTP_VERIFY_FAILED:
    case Types.REGISTER_OTP_CHANGE:
        return {
            ...state,
            verifyOTPState: {
                ...state.verifyOTPState,
                ...action.registrationState.verifyOTPState
            }
        };
    case Types.REGISTER_ID_CHANGE:
    case Types.REGISTER_NAME_CHANGE:
    case Types.REGISTER_CONFIRM_DETAILS_CHANGE:
    case Types.REGISTER_SUBMIT_INITIATED:
    case Types.REGISTER_SUBMIT_SUCCEEDED:
    case Types.REGISTER_SUBMIT_FAILED:
        return {
            ...state,
            identityInformationState: {
                ...state.identityInformationState,
                ...action.registrationState.identityInformationState
            }
        };
    default:
        return state;
    }
};