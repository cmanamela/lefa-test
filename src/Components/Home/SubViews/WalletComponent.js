import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'; 
import * as BalanceActions from '../BalanceActions';
import { TextMask } from 'react-native-masked-text';
import moneyBag from '../../../Assets/Images/homeIcons/MoneyBag.png';
import { formatting } from '../../../Shared/Constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        backgroundColor: '#006041',  
        flexDirection: 'row', 
        height: 150,
        paddingBottom: 10
    },
    text: {
        color: '#fff',
        fontSize: 25, 
        width: 500,
    },
    balanceContainer: { 
        width: 200, 
        height: 100, 
        marginLeft: '5%', 
        marginTop: 25,
    }, 
    textB: {
        color: '#fff',
        fontSize: 15, 
        marginTop: '8%',
    },
    IconBag: { 
        width: 40, 
        height: 40,  
        marginLeft: 90,
        marginBottom: 1,
    },
    txtmoney: {
        color: '#fff',
        marginLeft: 70, 
    }

});

class WalletComponent extends Component {

    async componentWillMount() {
        await this.props.balanceActions.RequestBalance(this.props.loginState.userId,this.props.loginState.jwt); 
    }
    
    render() {
        return ( 
            <View style={styles.container}> 
                <View style={styles.balanceContainer}>  
                    <Text style={styles.textB} >Available Balance: </Text>
                    {this.props.balanceRequestState.balance !== null ?
                        <TextMask style = {styles.text}
                            value= {this.props.balanceRequestState.balance}
                            type={'money'}
                            options={formatting}
                        /> 
                        : null 
                    }  
                </View>  
                <View> 
                    <TouchableHighlight 
                        onPress={()=>this.props.nav('SelectAmountComponent')}>
                        <Image source={moneyBag}
                            style={styles.IconBag}>
                        </Image> 
                    </TouchableHighlight>
                    <Text style={styles.txtmoney}>Add Money</Text> 
                </View>
            </View>
        );
    }
}
WalletComponent.propTypes = {
    nav: PropTypes.func.isRequired,
    balanceRequestState: PropTypes.shape ({
        balance: PropTypes.number
    }),
    balanceActions: PropTypes.shape ({
        RequestBalance: PropTypes.func
    }),
    loginState: PropTypes.shape({
        jwt: PropTypes.string,
        userInfo: PropTypes.array,
        userId: PropTypes.number
    }).isRequired, 
};

const mapStateToProps = (state) => ({
    balanceRequestState: state.balanceRequestState,
    loginState: state.loginState
});

const mapActionsToProps = (dispatch) => ({
    balanceActions: bindActionCreators(BalanceActions, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(WalletComponent);