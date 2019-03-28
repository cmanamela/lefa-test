import React from 'react';
import { View , Text , TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as LoadActions from './WalletUploadActions';
import { TextMask } from 'react-native-masked-text';
import { formatting } from '../../Shared/Constants';

class CompletePaymentCreditComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.uploadWallet = this.uploadWallet.bind(this);
    }

    static navigationOptions = {
        title: 'Complete Payment',
        headerStyle: {
            backgroundColor: '#006041',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    async uploadWallet(){
        const uuidv4 = require('uuid/v4');
        const saleLines = [ { 
            productId: 3,
            quantity: this.props.walletUploadState.amountToAdd,
            fulfilmentData: this.props.walletUploadState.walletBalanceState.walletId.toString() 
        } ];
        const paymentSettings = { 
            createToken: true,
            unattended: true,
            useTokenIfAvailable: true };
        const firstEvent = { event: 'QUOTE_ACCEPTED' 
        };

        const saleDetails = { 
            uniqueId: uuidv4(),
            currency: 'ZAR',
            serviceProviderId: 1,
            paymentMechanism: 'Card',
            saleLines: saleLines,
            paymentSettings: paymentSettings,
            firstEvent: firstEvent 
        };
        
        await this.props.loadActions.walletTopUp(this.props.walletUploadState.walletBalanceState.walletId, saleDetails, this.props.loginState.jwt);        
        const fiveSecondsInMillis = 5000;
        this.props.loadActions.setLoading();
        await new Promise(resolve => setTimeout(resolve, fiveSecondsInMillis));
        await this.props.loadActions.walletBalance(this.props.loginState.userId, this.props.loginState.jwt);
        this.props.navigation.navigate('SuccessComponent');
    }

    render() {
        return <View style = {Styles.container}>
            <TextMask style = {Styles.textAmount}
                value= { this.props.walletUploadState.amountToAdd }
                type={'money'}
                options={{
                    ...formatting,
                    unit: 'Amount to be added R'
                }}
            />
            <View style = {Styles.middleContainer}>    
                <Text style = {Styles.textCard}>Credit Card Details</Text> 
                <View style = {Styles.innerContainer}>     
                    <Text>Card Number</Text>
                    <TextInput style = {Styles.textInput}
                        keyboardType = "numeric"
                        placeholder = {'card number'}
                        onChangeText = { value => {
                            this.props.loadActions.setCardNumber(value);
                        }}
                    />
                    <View style = {Styles.row}> 
                        <Text style = {Styles.textDate}>Expiry Date</Text>   
                        <Text style = {Styles.cvvMove}>CVV</Text>
                    </View>
                    <View style = {Styles.row}> 
                        <TextInput style = {Styles.textInputDate}
                            keyboardType = "numeric"
                            placeholder = {'MM/YY'}
                            onChangeText = { value => {
                                this.props.loadActions.setCardExpiry(value);
                            }}
                        />
                        <TextInput style = {Styles.textInputCvv}
                            keyboardType = "numeric"
                            placeholder = {'cvv'}
                            onChangeText = { value => {
                                this.props.loadActions.setCardCVV(value);
                            }}
                        />
                    </View>
                </View>  
            </View>
            {this.props.walletUploadState.loading ? <ActivityIndicator animating={true} size="small" />
                : <TouchableOpacity style = {Styles.button}
                    onPress = { this.uploadWallet}
                >
                    <Text style = {Styles.textWhite}>CONTINUE</Text>
                </TouchableOpacity>
            }
        </View>;
    }
}

const Styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    textAmount: {
        fontSize: 20,
        textAlign: 'left',
        flexDirection: 'row',
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#006041',
        padding: 10,
        borderRadius: 25,
        width: '60%',
        marginTop: 10
    },
    textCard: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textDecorationLine: 'underline'
    },
    text: {
        textAlign: 'center'
    },
    textWhite: {
        textAlign: 'center',
        color: '#ffffff'
    },
    middleContainer: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginLeft: 20
    },
    innerContainer: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginLeft: 20
    },
    textInput: {
        fontSize: 10,
        textAlign: 'center',
        flexDirection: 'row',
        color: '#006041',
        borderBottomWidth: 0.5,
        width: '80%',
        marginBottom: 20
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    textInputDate: {
        fontSize: 10,
        textAlign: 'center',
        flexDirection: 'row',
        color: '#006041',
        borderBottomWidth: 0.5,
        width: '20%',
        marginBottom: 20
    },
    textDate: {
        width: '20%'
    },
    textInputCvv: {
        fontSize: 10,
        textAlign: 'center',
        flexDirection: 'row',
        color: '#006041',
        borderBottomWidth: 0.5,
        marginLeft: '40%',
        width: '5%',
        marginBottom: 20
    },
    cvvMove: {
        marginLeft: '40%',
        width: '5%'
    }
};

CompletePaymentCreditComponent.propTypes = {
    loadActions: PropTypes.shape({
        setCardNumber: PropTypes.func,
        setCardExpiry: PropTypes.func,
        setCardCVV: PropTypes.func,
        walletTopUp: PropTypes.func,
        walletBalance: PropTypes.func,
        addMoney: PropTypes.func,
        setLoading: PropTypes.func
    }).isRequired,
    walletUploadState: PropTypes.shape({
        amountToAdd: PropTypes.number,
        loading: PropTypes.bool,
        walletBalanceState: PropTypes.shape({
            balance: PropTypes.number,
            walletId: PropTypes.number
        }),
        cardInfoState: PropTypes.shape({
            cardNumber: PropTypes.string,
            expiry: PropTypes.string,
            cvv: PropTypes.string
        })
    }),
    navigation: PropTypes.shape ({
        navigate: PropTypes.func
    }).isRequired,
    loginState: PropTypes.shape ({
        userId: PropTypes.number,
        jwt: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    walletUploadState: state.walletUploadState,
    loginState: state.loginState
});

const mapActionsToProps = (dispatch) => ({
    loadActions: bindActionCreators(LoadActions, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(CompletePaymentCreditComponent);