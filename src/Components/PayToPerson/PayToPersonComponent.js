import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as P2PActions from './PayToPersonActions';
import { bindActionCreators } from 'redux';
import uuidv4 from 'uuid/v4';

class PayToPersonComponent extends React.PureComponent {
    
    static navigationOptions = {
        title: 'Pay ',
        headerStyle: {
            backgroundColor: '#006041',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor() {
        super();

        this.changeAmount = this.changeAmount.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.generateTransactionDetails = this.generateTransactionDetails.bind(this);
        this.submitPayment = this.submitPayment.bind(this);
    }

    generateTransactionDetails() {
        const theirWalletId = this.props.userInfo.walletId;
        const amount = this.props.paymentInfo.amount;
        const description = this.props.paymentInfo.description;
        const userId = this.props.loginState.userId;
        return {
            fromWalletFriendlyId: 'user-' + userId,
            toWalletFriendlyId: theirWalletId,
            amount: amount,
            description: description,
            currency: 'ZAR',
            uniqueId: uuidv4()
        };
    }
    
    async submitPayment() {
        const transactionDetails = this.generateTransactionDetails();
        const { jwt } = this.props.loginState;
        const result = await this.props.p2pActions.submitPayment(transactionDetails,jwt);
        
        if (result){
            this.props.navigation.navigate('WalletToWalletSuccessComponent');
        }
        
    }

    changeDescription(desc) {
        this.props.p2pActions.changeDescription(desc);
    }
    
    changeAmount(amount) {
        this.props.p2pActions.changeAmount(amount);
    }

    render() {
        const {
            paymentInfo,
            userInfo
        } = this.props;

        const initial = userInfo.firstName;

        return <View style={Styles.view}>
            <View style={Styles.contentSection}>
            
                <View style={Styles.initials}>
                    <Text>{initial}</Text>
                </View>
                <TextInput
                    style={Styles.TextInput}
                    placeholder="Enter Amount"
                    onChangeText={this.changeAmount}
                />

                <TextInput
                    style={Styles.TextInput}
                    placeholder="Enter Description (Optional)"
                    onChangeText={this.changeDescription} 
                />

                {
                    paymentInfo.paymentError && paymentInfo.paymentError &&
                    <Text>Payment was not successful</Text>
                }
            </View>

            <Button
                style={Styles.actions}
                disabled={paymentInfo.paying}
                onPress={this.submitPayment}
                title="PAY"/>
        </View>;
    }
}

const Styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center'
    },
    initials: {
        display: 'flex',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ff0000',
        margin: 20,
        padding: 20
    },
    contentSection: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1
    },
    actions: {
        flexGrow: 0,
        flexShrink: 0
    },
    errorText: {
        color: '#ff0000',
        alignSelf: 'center'
    },
    TextInput: {
        height: 40,
        borderBottomWidth: 1,
        marginTop: 20,
        marginBottom: 20
    }
});

PayToPersonComponent.propTypes = {
    userInfo: PropTypes.shape({
        firstName: PropTypes.string,
        userId: PropTypes.string,       
        walletId: PropTypes.string
    }),
    loginState: PropTypes.shape({
        userId: PropTypes.string,
        jwt: PropTypes.string
    }),
    paymentInfo: PropTypes.shape({
        amount: PropTypes.number,
        paying: PropTypes.bool,
        description: PropTypes.string
    }),
    p2pActions: PropTypes.shape({
        changeAmount: PropTypes.func,
        changeDescription: PropTypes.func,
        submitPayment: PropTypes.func
    }),
    navigation: PropTypes.shape ({
        navigate: PropTypes.func
    })
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.walletToWalletState.userInfo,
        loginState: state.loginState,
        paymentInfo: state.walletToWalletState.paymentInfo
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        p2pActions: bindActionCreators(P2PActions, dispatch)
    };
};

export default connect(mapStateToProps, mapActionsToProps)(PayToPersonComponent);