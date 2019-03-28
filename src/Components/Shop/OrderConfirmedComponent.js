import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BalanceActions from '../Home/BalanceActions';
import { TextMask } from 'react-native-masked-text';
import { formatting } from '../../Shared/Constants';
import generateImage from '../../Shared/ProductImageHelper/ProductImage';
import gift from '../../Assets/Images/giftWhite.png';

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center'
    },
    OrderHeading: {
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        height: 200
    },
    orderInfo: {
        marginLeft: 10
    },
    product: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    submit: {  
        backgroundColor: '#00b388',
        borderRadius: 20, 
        marginLeft: '10%',
        marginRight: '10%',
        width: '50%',
        height: '5%', 
        marginTop: 50,
    }, 
    submitText: {
        color: '#000',
        textAlign: 'center',
        paddingTop: 5,
        fontWeight: 'bold',
    }, 
    orderHeadingContainer: { 
        width: '100%', 
        height: 200,
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#006041' 
    },
    orderNumber: {
        color: '#fff',
        fontSize: 15
    },
    orderSummary: { 
        flexDirection: 'row', 
        margin: 25 
    },
    orderImage: { 
        width: 100, 
        height: 100,
        resizeMode: 'contain' 
    },
    shippingAddressLabel: { 
        paddingTop: 25,
        textAlign: 'center' 
    },
    orderActions: { 
        paddingTop: 25, 
        alignItems: 'center' 
    },
    orderTitle: {
        color: '#fff',
        fontSize: 30
    },
    Icongift: { 
        width: 60, 
        height: 60 
    }
});

class OrderConfirmedComponent extends Component {
    constructor(props) {
        super(props);
        
        this.Done = this.Done.bind(this);
    }
    
    static navigationOptions = {
        header: null
    };

    async Done(){
        await this.props.balanceActions.RequestBalance(this.props.loginState.userId, this.props.loginState.jwt);
        this.props.navigation.navigate('LandingComponent');
    }
    
    render() {
        const { category } = this.props.productState.selectedProductDetailState;
        return ( 
            <View style={styles.container}> 
                <View style={styles.orderHeadingContainer}>
                    <Image source={gift}
                        style={styles.Icongift}>
                    </Image>
                    <Text style={styles.orderTitle}>Order Confirmed</Text>
                    <Text style={styles.orderNumber}>Order No: {this.props.paymentOptionsState.orderNumber}</Text>
                </View> 
                <View style={styles.orderSummary}> 
                    <View>
                        <Image source={generateImage(category)}
                            style={styles.orderImage}>
                        </Image> 
                    </View>
                    <View style={styles.orderInfo}>
                        <Text style={styles.product}>{this.props.productState.selectedProductDetailState.name}</Text>
                        <Text>Order number: {this.props.paymentOptionsState.orderNumber}</Text>
                        <Text>Quantity: {this.props.purchaseSummaryState.quantity} </Text>
                        <TextMask 
                            value= {this.props.purchaseSummaryState.total}
                            type={'money'}
                            options={{
                                precision: formatting.moneyPrecision,
                                separator: '.',
                                delimiter: ',',
                                unit: 'Cost: R',
                                suffixUnit: ''
                            }}
                        /> 
                        <Text>Will be delivered by: 24 April, 10h00 </Text> 
                    </View> 
                </View>
                <View style={styles.shippingAddressLabel}>
                    <Text style={styles.product}>Shipping Address: User Address </Text>
                </View>  
                <TouchableHighlight 
                    onPress={this.Done}
                    style={styles.submit}
                    underlayColor="#fff">
                    <Text style={styles.submitText}> DONE </Text>
                </TouchableHighlight>  
                <View style={styles.orderActions}>
                    <Text style={styles.product}> CANCEL |  TRACK |  CONTACT US </Text>
                </View>
            </View>
        );
    }
}

OrderConfirmedComponent.propTypes = {
    navigation: PropTypes.object.isRequired,
    productState: PropTypes.shape({
        selectedProductDetailState: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
            price: PropTypes.number,
            serviceProvider: PropTypes.number,
            category: PropTypes.string
        }), 
        purchaseSummaryState: PropTypes.shape({
            productId: PropTypes.string,
            quantity: PropTypes.number,
            total: PropTypes.number
        }),
        paymentOptionsState: PropTypes.shape({
            orderNumber: PropTypes.string
        })
    }),
    loginState: PropTypes.shape({
        jwt: PropTypes.string,
        userInfo: PropTypes.array,
        userId: PropTypes.number
    }).isRequired,
    purchaseSummaryState: PropTypes.shape({
        productId: PropTypes.string,
        quantity: PropTypes.number,
        total: PropTypes.number
    }).isRequired,
    paymentOptionsState: PropTypes.shape({
        orderNumber: PropTypes.string
    }),
    balanceActions: PropTypes.shape ({
        RequestBalance: PropTypes.func
    })
};

const mapStateToProp = (state) => ({
    productState: state.productState,
    loginState: state.loginState,
    purchaseSummaryState: state.purchaseSummaryState,
    paymentOptionsState: state.paymentOptionsState 
});

const mapActionsToProps = (dispatch) => ({
    balanceActions: bindActionCreators(BalanceActions, dispatch)
});

export default connect(mapStateToProp, mapActionsToProps)(OrderConfirmedComponent);