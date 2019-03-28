import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PaymentOptionsActions from './PaymentOptionsActions';
import * as P2PActions from '../PayToPerson/PayToPersonActions';
import * as ProductActions from '../Shop/ProductActions';
import uuidv4 from 'uuid/v4';
import * as BalanceActions from '../Home/BalanceActions';
import arrow from '../../Assets/Images/arrow.png';
import { PaymentSrcTypes } from '../../Shared/Constants';
import * as Config from '../../Shared/Config';   
 
const firstItem = 0;

class PaymentOptionsComponent extends Component {
    
    constructor(props){
        super(props); 
        this.onPaymentOptionPress = this.onPaymentOptionPress.bind(this);
    }
    
    static navigationOptions = {
        title: 'Payment Options',
        headerStyle: {
            backgroundColor: '#006041',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    generateTransactionDetails() {
        const theirWalletId = this.props.cartState.cart[firstItem].serviceProviderId;
        const amount = this.props.purchaseSummaryState.total;
        const description = `Purchase of ${this.props.cartState.cart[firstItem].name}`;
        const userId = this.props.loginState.userId;
        
        return {
            fromWalletFriendlyId: 'user-' + userId,
            toWalletFriendlyId: 'user-' + theirWalletId,
            amount: amount,
            description: description,
            currency: 'ZAR',
            uniqueId: uuidv4()
        };
    }

    generateSaleDetails(mode){
        const { quantity } = this.props.purchaseSummaryState;
        const { productId, serviceProviderId } = this.props.cartState.cart[firstItem];
        
        return {
            'uniqueId': uuidv4(),
            'currency': 'ZAR',
            'serviceProviderId': serviceProviderId,
            'paymentMechanism': mode,
            'saleLines': [
                {
                    'productId': productId, 
                    'quantity': quantity
                }
            ],
            'paymentSettings': {
                'createToken': true,
                'unattended': true,
                'useTokenIfAvailable': true
            },
            'firstEvent': {
                'event': 'QUOTE_ACCEPTED'
            }
        };
    }

    spree_generateSaleDetails(){
        return { 
            'email': 'jacksoap@jacksoap.com',
            'bill_address_attributes': {
                'firstname': 'jack',
                'lastname': 'soap',
                'address1': '22 test st',
                'address2': '',
                'city': 'johannesburg',
                'phone': '0788445569',
                'zipcode': '2541',
                'state_name': 'Gauteng',
                'country_iso': 'ZAF'
            },
            'ship_address_attributes': {
                'firstname': 'jack',
                'lastname': 'soap',
                'address1': '22 test st',
                'address2': '',
                'city': 'johannesburg',
                'phone': '0788445569',
                'zipcode': '2541',
                'state_name': 'Gauteng',
                'country_iso': 'ZAF'
            },
            'payments_attributes': [
                {
                    'payment_method_id': '4'
                }
            ],
            'shipments_attributes': {},
            'payment_source': {} 
        };        
    }

    async onPaymentOptionPress(mode){
        const jwt = this.props.loginState.jwt;
        const spreejwt = this.props.loginState.spreeJwt;
        let saleDetails = this.generateSaleDetails(mode);
        let results = await this.props.PaymentOptionsActions.submitSale(walletId, saleDetails, mode,jwt);
        const { walletId } = this.props.balanceRequestState;
        
        const transactionDetails = this.generateTransactionDetails(); 
        const paymentResponse = await this.props.p2pActions.submitPayment(transactionDetails, jwt);
        let saleResult = false;
        if (paymentResponse){
            this.props.PaymentOptionsActions.changePaymentMode(mode);
              
            if (Config.platformIsSpree()){ 
                saleDetails = this.spree_generateSaleDetails();
                results = await this.props.PaymentOptionsActions.submitSale(walletId, saleDetails, mode,spreejwt);
            } else {
                saleDetails = this.generateSaleDetails(mode); 
                results = await this.props.PaymentOptionsActions.submitSale(walletId, saleDetails, mode,jwt);
            }    
            this.props.PaymentOptionsActions.setOrderNumber(results.saleId);  
            saleResult = results !== null;
        }

        const kafkaItems = this.generateKafkaItem();

        if (saleResult) {
            this.props.productActions.makeKafkaCall(kafkaItems);
            await this.props.balanceActions.RequestBalance(this.props.loginState.userId,this.props.loginState.jwt); 
            this.props.navigation.navigate('OrderConfirmedComponent');
        } else {
            this.props.navigation.navigate('PurchaseFailureComponent');
        } 
    }

    generateKafkaItem(){
        let date = new Date();
        const kafkaItems = { userId: this.props.loginState.userId,
            time: date.toISOString(),
            action: 'purchase',
            productId: this.props.cartState.cart[firstItem].productId,
            value: this.props.cartState.cart[firstItem].price
        };
        return kafkaItems;
    }

    render() {
        const { total, quantity } = this.props.purchaseSummaryState; 
        const { name } = this.props.cartState.cart[firstItem]; 
        const { processing } = this.props.paymentOptionsState;
        return (
            <View style={styles.container}>
                <View style={styles.summary}>
                    <View style={styles.item}> 
                        <Text style={styles.title}>{`${quantity} ${name}`}</Text>
                        <Text style={styles.title}>*R{total}</Text>
                    </View>
                    <Text>Delivery by 28th April, 08:00 pm</Text>
                </View>
                <View style= { styles.alignment }>
                    <Text style={styles.textSelect}>Select Payment Mode</Text>
                    <TouchableOpacity 
                        style={styles.options}
                        underlayColor = "#006041"
                        onPress={() => this.onPaymentOptionPress(PaymentSrcTypes.LEFA)}
                    >
                        <View style = {styles.row}>
                            <View style = {styles.column}>
                                <Text style = {styles.textWhite}>Pay Using Lefa</Text>
                                <Text style = {styles.textWhite}>Earn a Cashback of R10</Text>
                            </View>
                            <Image source={arrow}
                                style={styles.imageContainer}>
                            </Image>
                        </View> 
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.options}
                        underlayColor = "#006041"
                        onPress={()=>this.onPaymentOptionPress(PaymentSrcTypes.NEDBANK)}
                    >
                        <View style = {styles.row}>
                            <View style = {styles.column}>
                                <Text style = {styles.textWhite}>Pay using Nedbank account</Text>
                                <Text style = {styles.textWhite}> Earn R10 cashback</Text>
                            </View>
                            <Image source={arrow}
                                style={styles.imageContainer}>
                            </Image>
                        </View> 
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.options}
                        underlayColor = "#006041"
                        onPress={()=>this.onPaymentOptionPress(PaymentSrcTypes.CREDIT_CARD)}
                    >
                        <View style = {styles.row}>
                            <Text style = {styles.textWhite}>Credit Card</Text>
                            <Image source={arrow}
                                style={styles.imageContainer}>
                            </Image>
                        </View> 
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.options}
                        underlayColor = "#006041"
                        onPress={()=>this.onPaymentOptionPress(PaymentSrcTypes.DEBIT_CARD)}
                    >
                        <View style = {styles.row}>
                            <Text style = {styles.textWhite}>Debit Card</Text>
                            <Image source={arrow}
                                style={styles.imageContainer}>
                            </Image>
                        </View> 
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.options}
                        underlayColor = "#006041"
                        onPress={()=>this.onPaymentOptionPress(PaymentSrcTypes.CREDIT)}
                    >
                        <View style = {styles.row}>
                            <Text style = {styles.textWhite}>Pay On Credit</Text>
                            <Image source={arrow}
                                style={styles.imageContainer}>
                            </Image>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    processing &&
                    <View style={styles.proccessIndicator}>
                        <ActivityIndicator animating={true} size="small" />
                        <Text>Processing your Purchase</Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    summary: {
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        padding: 10
    },
    proccessIndicator: {
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optionHeader: {
        margin: 10
    },
    options: {
        display: 'flex',
        alignItems: 'stretch',
        backgroundColor: '#006041',
        width: '100%'
    },
    center: {
        alignItems: 'center',
        width: 60,
        justifyContent: 'center'
    },
    textSelect: {
        marginLeft: 10,
        textAlign: 'left',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10
    },
    alignment: {
        alignItems: 'center'
    }
    ,
    text: {
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 20
    },
    textWhite: {
        color: '#ffffff',
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 20
    },
    imageContainer: { 
        width: 13, 
        height: 26,
        flexGrow: 0,
        flexShrink: 0,
    },
    row: {
        padding: 16,
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#fff',
        borderTopWidth: 0.5,
        borderTopColor: '#fff'
    },
    column: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexGrow: 1
    }
});

PaymentOptionsComponent.propTypes = {
    loginState: PropTypes.shape({
        jwt: PropTypes.string,
        userInfo: PropTypes.array,
        userId: PropTypes.number,
        spreeJwt: PropTypes.string
    }).isRequired,
    navigation: PropTypes.object.isRequired,
    purchaseSummaryState: PropTypes.shape({
        productId: PropTypes.string,
        quantity: PropTypes.number,
        total: PropTypes.number
    }).isRequired,
    productState: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        productId: PropTypes.number,
        serviceProviderId: PropTypes.number
    }).isRequired,
    PaymentOptionsActions: PropTypes.shape({
        changePaymentMode: PropTypes.func,
        submitSale: PropTypes.func,
        setOrderNumber: PropTypes.func
    }).isRequired,
    paymentOptionsState: PropTypes.shape({
        paymentMode: PropTypes.string,
        processing: PropTypes.bool,
        processingError: PropTypes.string,
        orderNumber: PropTypes.number
    }).isRequired,
    balanceRequestState: PropTypes.shape({
        walletId: PropTypes.number
    }).isRequired,
    p2pActions: PropTypes.shape({
        submitPayment: PropTypes.func
    }),
    productActions: PropTypes.shape({
        makeKafkaCall: PropTypes.func
    }),
    balanceActions: PropTypes.shape({
        RequestBalance: PropTypes.func
    }),
    cartState: PropTypes.shape({
        cart: PropTypes.array
    })
};

const mapStateToProp = (state) => ({
    loginState: state.loginState,
    purchaseSummaryState: state.purchaseSummaryState,
    productState: state.productState.selectedProductDetailState,
    paymentOptionsState: state.paymentOptionsState,
    balanceRequestState: state.balanceRequestState,
    cartState: state.cartState
});

const mapActionsToProps = (dispatch) => ({
    PaymentOptionsActions: bindActionCreators(PaymentOptionsActions, dispatch),
    p2pActions: bindActionCreators(P2PActions, dispatch),
    productActions: bindActionCreators(ProductActions, dispatch),
    balanceActions: bindActionCreators(BalanceActions, dispatch)
});

export default connect(mapStateToProp, mapActionsToProps)(PaymentOptionsComponent);