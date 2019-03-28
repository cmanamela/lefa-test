import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableHighlight, Image } from 'react-native';    
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'; 
import * as loginActions from '../Login/LoginActions';
import scanIcon from '../../Assets/Images/Scan.png';

const styles = StyleSheet.create({
    view: {
        flexGrow: 0,
        flexShrink: 0,
        alignSelf: 'stretch',
        height: 56,
        borderTopColor: '#bdbdbd',
        backgroundColor: '#efefef',
        borderTopWidth: 1,
        borderStyle: 'solid',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    text: {
        color: '#fff',
    },
    submit: {  
        position: 'absolute',
        backgroundColor: '#00b388',
        borderRadius: 100, 
        width: 72,
        height: 72,
        top: -36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitText: {
        fontWeight: 'bold',
        paddingTop: 25,
        marginLeft: 20,
    },
    scanIcon: {
        height: 24,
        width: 24,
        resizeMode: 'contain'
    },
    scanIconBody: {
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scanIconText: {
        color: '#fff',
        fontWeight: '400'
    }
});

class BtmNavigationComponent extends Component {
    render() { 
        return (
            <View style={styles.view}>
                <TouchableHighlight
                    onPress={()=>this.props.nav('QRScannerPaymentComponent')}
                    style={styles.submit}
                    underlayColor="#fff">
                    <View style={styles.scanIconBody}>
                        <Image 
                            style={styles.scanIcon}
                            source={scanIcon}/>
                        <Text style={styles.scanIconText}>Scan</Text>
                    </View>    
                </TouchableHighlight>
            </View> 
        );
    }
}

BtmNavigationComponent.propTypes = { 
    nav: PropTypes.func.isRequired,
    loginState: PropTypes.shape({
        loggedIn: PropTypes.bool
    }).isRequired,
    loginActions: PropTypes.shape({
        logout: PropTypes.func
    }).isRequired
};
const mapStateToProp = (state) => ({
    loginState: state.loginState
});

const mapActionsToProps = (dispatch) => ({
    loginActions: bindActionCreators(loginActions, dispatch)
});
export default connect(mapStateToProp, mapActionsToProps)(BtmNavigationComponent);