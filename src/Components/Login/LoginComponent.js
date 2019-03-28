import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import LoginPageComponent from './SubViews/LoginPageComponent';
import * as loginActions from './LoginActions';

class LoginComponent extends Component {
    static navigationOptions() {
        return {
            title: 'Login',
            headerStyle: {
                backgroundColor: '#006041',
            },
            headerTintColor: '#fff'
        };
    }
    
    render() {
        const { 
            email,
            password,
            error,
            jwt,
            loading,
            loadingUserInfo,
            userInfo,
            userId
        } = this.props.loginState;
        
        const {
            changeEmail,
            changePassword,
            secureLogin,
            getUserInfoByUsername
        } = this.props.loginActions;

        const loginLoading = loading || loadingUserInfo;

        return (
            <LoginPageComponent 
                email={email}
                password={password}
                error={error}
                loading={loginLoading}
                jwt={jwt}
                userInfo={userInfo}
                userId={userId}
                onChangeEmail={changeEmail}
                onChangePassword={changePassword}
                onSecureLogin={secureLogin}
                onGetUserInfoByUsername={getUserInfoByUsername}
                navigate={this.props.navigation.navigate}
            />
        );
    }
}

LoginComponent.propTypes = {
    loginState: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
        jwt: PropTypes.string,
        userInfo: PropTypes.array,
        userId: PropTypes.number,
        error: PropTypes.string,
        loading: PropTypes.bool,
        loggedIn: PropTypes.bool,
        loadingUserInfo: PropTypes.bool
    }),
    loginActions: PropTypes.shape({
        changeEmail: PropTypes.func,
        changePassword: PropTypes.func,
        secureLogin: PropTypes.func,
        getUserInfoByUsername: PropTypes.func
    }).isRequired,
    navigation: PropTypes.object.isRequired
};

const mapStateToProp = (state) => ({
    loginState: state.loginState
});

const mapActionsToProps = (dispach) => ({
    loginActions: bindActionCreators(loginActions, dispach)
});

export default connect(mapStateToProp, mapActionsToProps)(LoginComponent);