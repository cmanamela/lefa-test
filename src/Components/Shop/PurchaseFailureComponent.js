import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    display: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f00',
        margin: 20,
        height: 300,
        width: '90%'
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        width: '100%',
        fontSize: 20,
        textAlign: 'center',
        
        color: '#fff'
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
});

class PurchaseFailureComponent extends Component {
    static navigationOptions(){
        return {
            title: 'Purchase Error'
        };
        
    } 
    
    render() {
        return ( 
            <View style={styles.container}>
                <View style={styles.display}>
                    <Text style={styles.text}>Failled to process your order at this moment, please try again later</Text>
                </View>
                <TouchableHighlight 
                    onPress={()=>this.props.navigation.navigate('LandingComponent')}
                    style={styles.submit}
                    underlayColor="#fff"
                >
                    <Text style={styles.submitText}> DONE </Text>
                </TouchableHighlight> 
            </View>
        );
    }
}

PurchaseFailureComponent.propTypes = {
    navigation: PropTypes.object.isRequired,
    productState: PropTypes.shape({
        selectedProductDetailState: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
            price: PropTypes.number,
            serviceProvider: PropTypes.number
        }), 
        loginState: PropTypes.shape({
            jwt: PropTypes.string,
            userInfo: PropTypes.array,
            userId: PropTypes.number
        }),
        purchaseSummaryState: PropTypes.shape({
            productId: PropTypes.string,
            quantity: PropTypes.number,
            total: PropTypes.number
        }),
        paymentOptionsState: PropTypes.shape({
            orderNumber: PropTypes.number
        })
    }),
    purchaseSummaryState: PropTypes.shape({
        productId: PropTypes.string,
        quantity: PropTypes.number,
        total: PropTypes.number
    }),
    paymentOptionsState: PropTypes.shape({
        orderNumber: PropTypes.number
    })
};

const mapStateToProp = (state) => ({
    productState: state.productState,
    loginState: state.loginState,
    purchaseSummaryState: state.purchaseSummaryState,
    paymentOptionsState: state.paymentOptionsState 
});

export default connect(mapStateToProp)(PurchaseFailureComponent);