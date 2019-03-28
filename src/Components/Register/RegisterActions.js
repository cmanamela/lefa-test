import * as Types from './RegisterActionTypes';
import InitialState from '../../Shared/State/InitialState';
import * as API from '../../Shared/API/API';

export const clearContactDetailStateAC = () => {
    return {
        type: Types.REGISTER_CLEAR_CONTACT_DETAILS,
        registrationState: {
            contactDetailState: InitialState.registrationState.contactDetailState
        }
    }; 
};

export const clearVerifyOTPStateAC = () => {
    return {
        type: Types.REGISTER_CLEAR_VERIFY_OTP,
        registrationState: {
            verifyOTPState: InitialState.registrationState.verifyOTPState
        }
    };
};

export const clearIdentityInformationStateAC = () => {
    return {
        type: Types.REGISTER_CLEAR_IDENTITY_INFORMATION,
        registrationState: {
            identityInformationState: InitialState.registrationState.identityInformationState
        }
    };
};

export const clearVerifyOTPState = () => dispatch => dispatch(clearVerifyOTPStateAC());

export const clearContactDetailState = () => dispatch => dispatch(clearContactDetailStateAC());

export const clearIdentityInformationState = () => dispatch => dispatch(clearIdentityInformationStateAC());

export const emailChangedAC = (email) => {
    return {
        type: Types.REGISTER_EMAIL_CHANGE,
        registrationState: {
            contactDetailState: {
                email
            }
        }
    };
};

export const passwordChangedAC = (password) => {
    return {
        type: Types.REGISTER_EMAIL_CHANGE,
        registrationState: {
            contactDetailState: {
                password
            }
        }
    };
};

export const cellnoChangedAC = (cellNo) => {
    return {
        type: Types.REGISTER_EMAIL_CHANGE,
        registrationState: {
            contactDetailState: {
                cellNo
            }
        }
    };
};

export const changeCellNo = (cellno) => (dispatch) => dispatch(cellnoChangedAC(cellno));

export const changeEmail = (email) => (dispatch) => dispatch(emailChangedAC(email));

export const changePassword = (password) => (dispatch) => dispatch(passwordChangedAC(password));

export const changeStepAC = (newStep) => {
    return {
        type: Types.REGISTER_UPDATE_STEP,
        registrationState: {
            currentStep: newStep
        }
    };
};

export const changeStep = (newStep) => (dispatch) => dispatch(changeStepAC(newStep));

export const OTPRequestInitiatedAC = () => {
    return {
        type: Types.REGISTER_OTP_REQUEST_INITIATED,
        registrationState: {
            verifyOTPState: {
                requesting: true,
                requestError: null
            }
        }
    };
};

export const OTPRequestFailedAC = (err) => {
    return {
        type: Types.REGISTER_OTP_REQUEST_FAILED,
        registrationState: {
            verifyOTPState: {
                requesting: false,
                requestError: err
            }
        }
    };
};

export const OTPRequestSucceededAC = () => {
    return {
        type: Types.REGISTER_OTP_REQUEST_SUCCEEDED,
        registrationState: {
            verifyOTPState: {
                requesting: false
            }
        }
    };
};

export const requestOTP = (number) => async (dispatch) => {
    dispatch(OTPRequestInitiatedAC());
    try {
        await API.requestOTP(number);
        dispatch(OTPRequestSucceededAC());
    } catch (e) {
        dispatch(OTPRequestFailedAC(e));
    }
};

export const OTPVerifyInitiatedAC = () => {
    return {
        type: Types.REGISTER_OTP_VERIFY_INITIATED,
        registrationState: {
            verifyOTPState: {
                verifying: true,
                verificationError: null
            }
        }
    };
};

export const OTPVerifySucceededAC = () => {
    return {
        type: Types.REGISTER_OTP_VERIFY_SUCCEEDED,
        registrationState: {
            verifyOTPState: {
                verifying: false
            }
        }
    };
};

export const OTPVerifyFailedAC = (err) => {
    return {
        type: Types.REGISTER_OTP_VERIFY_FAILED,
        registrationState: {
            verifyOTPState: {
                verifying: false,
                verificationError: err
            }
        }
    };
};

export const verifyOTP = (cellNo, otp) => async (dispatch) => {
    dispatch(OTPVerifyInitiatedAC());
    try {
        await API.validateOTP(cellNo, otp);
        dispatch(OTPVerifySucceededAC());
        return true;
    } catch (e) {
        dispatch(OTPVerifyFailedAC(e));
    }
    return false;
};

export const OTPChangedAC = (otp) => {
    return {
        type: Types.REGISTER_OTP_CHANGE,
        registrationState: {
            verifyOTPState: {
                otp
            }
        }
    };
};

export const IDChangedAC = (id) => {
    return {
        type: Types.REGISTER_ID_CHANGE,
        registrationState: {
            identityInformationState: {
                id
            }
        }
    };
};

export const nameChangedAC = (name) => {
    return {
        type: Types.REGISTER_NAME_CHANGE,
        registrationState: {
            identityInformationState: {
                name
            }
        }
    };
};

export const confirmDetailsChangedAC = (confirm) => {
    return {
        type: Types.REGISTER_CONFIRM_DETAILS_CHANGE,
        registrationState: {
            identityInformationState: {
                confirmDetails: confirm
            }
        }
    };
};

export const changeOTP = (otp) => (dispatch) => dispatch(OTPChangedAC(otp));

export const changeName = (name) => (dispatch) => dispatch(nameChangedAC(name));

export const changeID = (id) => (dispatch) => dispatch(IDChangedAC(id));

export const changeConfirmDetails = (confirm) => (dispatch) => dispatch(confirmDetailsChangedAC(confirm));

export const registrationSubmitInitiatedAC = () => {
    return {
        type: Types.REGISTER_SUBMIT_INITIATED,
        registrationState: {
            identityInformationState: {
                submitting: true,
                submitError: null
            }
        }
    };
};

export const registrationSubmitSucceededAC = () => {
    return {
        type: Types.REGISTER_SUBMIT_SUCCEEDED,
        registrationState: {
            identityInformationState: {
                submitting: false
            }
        }
    };
};

export const registrationSubmitFailedAC = (err) => {
    return {
        type: Types.REGISTER_SUBMIT_FAILED,
        registrationState: {
            identityInformationState: {
                submitting: false,
                submitError: err
            }
        }
    };
};

export const submitRegistration = (registration) => async (dispatch) => {
    dispatch(registrationSubmitInitiatedAC());
    try {
        await API.registerNewUser(registration);
        dispatch(registrationSubmitSucceededAC());
        return true;
    } catch (e) {
        dispatch(registrationSubmitFailedAC(e));
    }

    return false;
};