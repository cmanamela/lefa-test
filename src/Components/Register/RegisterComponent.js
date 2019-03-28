import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RegistrationActions from './RegisterActions';
import * as LoginActions from '../Login/LoginActions';
import PropTypes from 'prop-types';
import ContactDetailsComponent from './SubViews/ContactDetailsComponent';
import VerifyOTPComponent from './SubViews/VerifyOTPComponent';
import StepsComponent from '../../Shared/Steps/StepsComponent';
import { RegistrationSteps } from './RegisterConstants';
import IdentityDetailsComponent from './SubViews/IdentityDetailsComponent';

class RegisterComponent extends React.PureComponent {

    static navigationOptions = {
        title: 'Register Now',
        headerStyle: {
            backgroundColor: '#006041',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);

        this.nextStep = this.nextStep.bind(this);
        this.activeStepView = this.activeStepView.bind(this);
        this.sendOTP = this.sendOTP.bind(this);
        this.submitContactDetails = this.submitContactDetails.bind(this);
        this.confirmOTP = this.confirmOTP.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
        this.generateRegisterSubmission = this.generateRegisterSubmission.bind(this);
        this.requestToLogin = this.requestToLogin.bind(this);
    }

    requestToLogin(){
        this.props.navigation.navigate('LoginComponent');
    }

    nextStep() {
        const stepIncrement = 1;
        const { registrationActions, registrationState } = this.props;
        registrationActions.changeStep(registrationState.currentStep + stepIncrement);
    }

    async sendOTP() {
        const { registrationActions, registrationState } = this.props;
        await registrationActions.requestOTP(registrationState.contactDetailState.cellNo);
    }

    async submitContactDetails() {
        await this.sendOTP();
        this.nextStep();
    }

    async confirmOTP() {
        const { registrationActions, registrationState } = this.props;
        const verified = await registrationActions.verifyOTP(registrationState.contactDetailState.cellNo, registrationState.verifyOTPState.otp);
        
        if (verified) {
            this.nextStep();
        }
    }

    generateRegisterSubmission() {
        const { registrationState } = this.props;
        const firstNameIndex = 0;
        const middleNameIndex = 1;
        const lastNameIndex = 2;
        const nameTokens = registrationState.identityInformationState.name.split(' ');
        const hasLastNameOnlyLength = 2;
        let firstName, middleName, lastName;
        
        firstName = nameTokens[firstNameIndex];
        if (nameTokens.length <= hasLastNameOnlyLength) {
            lastName = nameTokens[middleNameIndex];
        } else {
            middleName = nameTokens[middleNameIndex];
            lastName = nameTokens[lastNameIndex];
        }
        
        const userIdentities = [ { 
            identity: registrationState.contactDetailState.email,
            identityType: 'username',
            password: registrationState.contactDetailState.password
        } ];
        return {
            firstName,
            middleName,
            lastName,
            email1: registrationState.contactDetailState.email,
            phone1: registrationState.contactDetailState.cellNo,
            nationalIdentityNumber: registrationState.identityInformationState.id,
            verificationCodes: registrationState.verifyOTPState.otp,
            userIdentities
        };
    }

    async submitRegistration() {
        const { registrationActions } = this.props;
        const registerSubmission = this.generateRegisterSubmission();
        const registrationSuccess = await registrationActions.submitRegistration(registerSubmission);
        
        if (registrationSuccess) {
            const loginDetails = {
                identity: this.props.registrationState.contactDetailState.email,
                password: this.props.registrationState.contactDetailState.password
            };
            const loginInfo = await this.props.loginActions.secureLogin(loginDetails);
            if (loginInfo) {
                const jwt = loginInfo.headerValue;
                await this.props.loginActions.getUserInfoByUsername(this.props.registrationState.contactDetailState.email, jwt);
                this.props.navigation.navigate('LandingComponent');
            }
        }
    }

    activeStepView(step) {
        const emptyStringLength = 0;
        const passwordRequiredLength = 5;
        const saIDLength = 13;
        const { registrationState, registrationActions } = this.props;
        const otp = registrationState.verifyOTPState.otp;
        const confirmingOTP = registrationState.verifyOTPState.verifying;
        const otpEntered = !!(otp && otp.length > emptyStringLength);
        const requestingOTP = registrationState.verifyOTPState.requesting;
        const cellNo = registrationState.contactDetailState.cellNo;
        const email = registrationState.contactDetailState.email;
        const password = registrationState.contactDetailState.password;
        const contactDetailsProvided = !!(cellNo && email && password && cellNo.length > emptyStringLength && password.length > passwordRequiredLength && email.length > emptyStringLength);
        const submittingRegistration = registrationState.identityInformationState.submitting;
        const idNo = registrationState.identityInformationState.id;
        const name = registrationState.identityInformationState.name;
        const detailsConfirmed = registrationState.identityInformationState.confirmDetails;
        const identityDetailsProvided = !!(detailsConfirmed && idNo && name && idNo.length === saIDLength && name.length > emptyStringLength);
        const otpHasError = !!registrationState.verifyOTPState.verificationError;
        const registerHasError = !!registrationState.identityInformationState.submitError;

        switch (step) {
        case RegistrationSteps.IdentityInformation:
            return <IdentityDetailsComponent
                submitting={submittingRegistration}
                detailsProvided={identityDetailsProvided}
                confirmDetail={detailsConfirmed}
                onIdNoChange={registrationActions.changeID}
                onNameChange={registrationActions.changeName}
                onConfirmDetailChange={() => registrationActions.changeConfirmDetails(!detailsConfirmed)}
                onSubmit={this.submitRegistration}
                hasError={registerHasError}/>;
        case RegistrationSteps.VerifyOTP:
            return <VerifyOTPComponent
                hasError={otpHasError}
                OTPEntered={otpEntered}
                onOTPChange={registrationActions.changeOTP}
                onOTPConfirm={this.confirmOTP}
                confirming={confirmingOTP}/>;
        default:
            return <ContactDetailsComponent 
                requestingOTP={requestingOTP}
                detailsProvided={contactDetailsProvided}
                onEmailChange={registrationActions.changeEmail}
                onPasswordChange={registrationActions.changePassword}
                onCellNoChange={registrationActions.changeCellNo}
                onSubmit={this.submitContactDetails}
                onRequestToLogin={this.requestToLogin} />;
        }
    }

    render() {
        const { registrationState } = this.props;
        const steps = [ 'Step 1', 'Step 2', 'Step 3' ];

        return <View style={style.view}>
            <StepsComponent steps={steps} currentStepIndex={registrationState.currentStep}/>
            { this.activeStepView(registrationState.currentStep) }
        </View>;
    }
}

RegisterComponent.propTypes = {
    registrationState: PropTypes.shape({
        currentStep: PropTypes.number.isRequired,
        contactDetailState: PropTypes.shape({
            cellNo: PropTypes.string,
            password: PropTypes.string,
            email: PropTypes.string
        })
    }).isRequired,
    registrationActions: PropTypes.shape({
        changeCellNo: PropTypes.func,
        changeEmail: PropTypes.func,
        changePassword: PropTypes.func,
        changeStep: PropTypes.func,
        requestOTP: PropTypes.func
    }).isRequired,
    navigation: PropTypes.object.isRequired,
    loginActions: PropTypes.shape({
        secureLogin: PropTypes.func,
        getUserInfoByUsername: PropTypes.func
    })
};

const style = StyleSheet.create({
    view: {
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
});

const mapStateToProps = (state) => ({
    registrationState: state.registrationState
});

const mapActionsToProps = (dispatch) => ({
    registrationActions: bindActionCreators(RegistrationActions, dispatch),
    loginActions: bindActionCreators(LoginActions, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(RegisterComponent);