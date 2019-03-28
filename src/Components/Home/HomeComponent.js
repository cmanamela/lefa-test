import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import IntroductionComponent from './SubViews/IntroductionComponent'; 
import ShoppingComponent from './SubViews/ShoppingComponent';
import HeaderNavComponent from '../HeaderNav/HeaderNavComponent'; 
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { bindActionCreators } from 'redux';
import * as LoginActions from '../Login/LoginActions';
import * as RegisterActions from '../Register/RegisterActions';
import { RegistrationSteps } from '../Register/RegisterConstants';
import PaymentsComponent from './SubViews/PaymentsComponent';

const styles = StyleSheet.create({ 
    heading: {  
        paddingLeft: 18,
        fontWeight: 'bold', 
        paddingTop: 20,
    },
    submit: {  
        backgroundColor: '#00b388', 
    },
    view: {
        height: '100%',
        display: 'flex', 
    },
    scrollView: {
        flexGrow: 1,
        flexShrink: 1,
    }
});

class HomeComponent extends Component {

    static navigationOptions = {
        header: null
    };

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            this.props.loginActions.clearContactDetailState();
            this.props.registerActions.clearIdentityInformationState();
            this.props.registerActions.clearVerifyOTPState();
            this.props.registerActions.clearContactDetailState();
            this.props.registerActions.changeStep(RegistrationSteps.ContactDetails);
        }
    }

    render() {   
        return <View style={styles.view}>  
            <HeaderNavComponent nav={this.props.navigation.navigate}/>  
            <ScrollView
                style={styles.scrollView}> 
                <IntroductionComponent nav={this.props.navigation.navigate}/> 
                <View>
                    <Text style={styles.heading}>Recharge or Bill Payments</Text>
                    <PaymentsComponent nav={this.props.navigation.navigate}/>
                </View>
                <View>
                    <Text style={styles.heading}>Shopping</Text>
                    <ShoppingComponent nav={this.props.navigation.navigate}/>
                </View>
            </ScrollView>
        </View>;
    }
}

HomeComponent.propTypes = {
    isFocused: PropTypes.bool,
    loginActions: PropTypes.shape({
        clearContactDetailState: PropTypes.func
    }),
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
    loginState: PropTypes.shape({
        jwt: PropTypes.string,
        userInfo: PropTypes.array,
        userId: PropTypes.number
    }).isRequired,
    registerActions: PropTypes.shape({
        clearContactDetailState: PropTypes.func,
        clearVerifyOTPState: PropTypes.func,
        clearIdentityInformationState: PropTypes.func,
        changeStep: PropTypes.func
    })
};

const mapStateToProp = (state) => ({
    loginState: state.loginState
});

const mapActionToProps = (dispatch) => ({
    loginActions: bindActionCreators(LoginActions, dispatch),
    registerActions: bindActionCreators(RegisterActions, dispatch)
});

export default withNavigationFocus(connect(mapStateToProp, mapActionToProps)(HomeComponent));