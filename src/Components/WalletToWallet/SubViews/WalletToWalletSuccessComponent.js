import React, { Component } from 'react';
import { Text,StyleSheet, View,TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletToWalletSuccessComponent extends Component {
    render() {
        
        return (
            <View style={styles.container}>

                <View style={styles.topHalf}>

                    <Text style={styles.text}>
                        Successful!                       
                    </Text>
                    <Text style={styles.heading}>
                        R{this.props.paymentInfo.amount}                        
                    </Text>
                    <Text style={styles.descriptions}>
                        Paid Successfully to {this.props.walletToWalletState.userInfo.firstName}                       
                    </Text>
                    <Text style={styles.descriptions}>
                        Description                     
                    </Text>
                    <Text style={styles.descriptions}>
                        {this.props.paymentInfo.description}           
                    </Text>

                </View>

                <View style={styles.bottomHalf}>

                    <Text style={styles.halfDescription}>
                        Updated Balance
                    </Text>
                    <Text style={styles.Balance}>
                        R {this.props.balanceRequestState.balance}
                    </Text>
                    <Text style={styles.textAdd}>
                        +Add Money
                    </Text>

                    <TouchableHighlight
                        onPress={()=>this.props.navigation.navigate('LandingComponent')}
                        style={styles.submit}
                        underlayColor="#006041">
                        <Text style={styles.submitText}> Done </Text>
                    </TouchableHighlight>

                </View>

            </View>
            
        );
    }
}WalletToWalletSuccessComponent.propTypes = {
    walletToWalletState: PropTypes.shape({
        userInfo: PropTypes.shape({
            userId: PropTypes.string,
            email: PropTypes.string,
            amount: PropTypes.number,
            firstName: PropTypes.string,
            surname: PropTypes.string,
            middleName: PropTypes.string
        }),
        
    }),
    paymentInfo: PropTypes.shape({
        amount: PropTypes.string,
        paying: PropTypes.bool,
        description: PropTypes.string
    }),
    balanceRequestState: PropTypes.shape ({
        balance: PropTypes.number
    }),
    navigation: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    balanceRequestState: state.balanceRequestState,
    walletToWalletState: state.walletToWalletState,
    paymentInfo: state.walletToWalletState.paymentInfo
});

export default connect(mapStateToProps, null)(WalletToWalletSuccessComponent);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
        alignSelf: 'center', 
        backgroundColor: '#e8df33',
        padding: 10,
        width: 300,
        height: 50,
        marginTop: 16,
        marginBottom: '10%'
    },
    heading: { 
        fontSize: 24, 
        color: '#ffffff',
        alignSelf: 'center', 
        padding: 10, 
        marginTop: 30 
    },
    simpleText: { 
        color: 'black', 
        fontSize: 20, 
        alignSelf: 'center', 
        padding: 10, 
        marginTop: 16
    },
    text: {
        alignSelf: 'center', 
        color: '#ffffff',
        fontSize: 30,
        padding: 10, 
        marginTop: 10  
    },
    descriptions: {
        alignSelf: 'center',
        marginBottom: 10,
        color: '#ffffff',
        marginTop: 10

    },
    halfDescription: {
        alignSelf: 'center',
        marginBottom: 10,
        color: 'black',
        marginTop: '10%'

    },
    topHalf: {
        backgroundColor: '#006041',
        width: '100%',
        height: '60%'

    },
    bottomHalf: {
        backgroundColor: 'white',
        width: '100%',
        height: '40%'

    },
    Balance: {
        color: 'black',
        fontSize: 30,
        alignSelf: 'center'
    },
    submit: {
        alignItems: 'center',  
        backgroundColor: '#006041',
        borderRadius: 20, 
        marginLeft: '25%',
        marginRight: '25%',
        width: '50%',
        height: '15%', 
        position: 'absolute',
        top: '70%'
    },
    textAdd: {
        alignSelf: 'center', 
        padding: 10, 
        marginTop: 5  
    },
    TouchableHighlight: {
        backgroundColor: '#006041',
    },
    submitText: {
        color: '#FFF',
        marginTop: 5
    }
});