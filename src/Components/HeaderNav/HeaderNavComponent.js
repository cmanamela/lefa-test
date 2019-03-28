import React, { Component } from 'react';
import { Header } from 'react-native-elements'; 
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';  
import * as loginActions from '../Login/LoginActions';
import logo from '../../Assets/Images/navbarIcon/LefaLogo_White.png';

const styles = StyleSheet.create({
    view: {
        flexGrow: 0,
        flexShrink: 0
    },
    title: {
        color: '#fff', 
        fontSize: 20,
        fontWeight: '500'
    },
    accountActionText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500'
    },
    container: {
        borderBottomWidth: 0,
        paddingTop: 0
    },
    coverIcon: { 
        width: 100, 
        height: 24,
        resizeMode: 'contain'
    }
});

class HeaderNavComponent extends Component {

    constructor(props){
        super(props);
        this.handleLogOnClick = this.handleLogOnClick.bind(this); 
    }

    handleLogOnClick(destination){ 
        if (this.props.loginState.loggedIn){
            this.props.loginActions.logout();
        }
        this.props.nav(destination);
    }
    render() {
        const WHITE = '#fff'; 
        const jwt = this.props.loginState.jwt;
        let navigateTo = 'LoginComponent';
        if (jwt !== null){
            navigateTo = 'GeneratedQRcodeComponent';
        }
        return (
            <View style={styles.view}>
                <Header 
                    backgroundColor="#006041"
                    leftComponent={this.props.loginState.loggedIn && { icon: 'select-all', color: WHITE, onPress: () => this.props.nav(navigateTo) }}
                    centerComponent={<Image style={styles.coverIcon} source={logo} />}
                    rightComponent= 
                        {
                            this.props.loginState.loggedIn
                                ? 
                                <Text style={styles.accountActionText} onPress = {()=>this.handleLogOnClick('HomeComponent')}>Log Out</Text>
                                :
                                { icon: 'account-circle', color: WHITE, onPress: ()=>this.handleLogOnClick('LoginComponent') }

                        }
                    containerStyle={styles.container}
                />
            </View>
        );
    }
}
HeaderNavComponent.propTypes = { 
    nav: PropTypes.func.isRequired,
    loginState: PropTypes.shape({
        loggedIn: PropTypes.bool,
        jwt: PropTypes.string
    }).isRequired,
    loginActions: PropTypes.shape({
        logout: PropTypes.func, 
    }).isRequired
};
const mapStateToProp = (state) => ({
    loginState: state.loginState
});

const mapActionsToProps = (dispatch) => ({
    loginActions: bindActionCreators(loginActions, dispatch)
});
export default connect(mapStateToProp, mapActionsToProps)(HeaderNavComponent);