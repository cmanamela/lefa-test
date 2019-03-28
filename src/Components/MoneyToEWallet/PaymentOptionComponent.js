import React from 'react';
import { View , Text , TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextMask } from 'react-native-masked-text';
import arrow from '../../Assets/Images/arrow.png';
import { formatting } from '../../Shared/Constants';

class PaymentOptionComponent extends React.PureComponent {
    static navigationOptions = {
        title: 'Add Money',
        headerStyle: {
            backgroundColor: '#006041',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

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
            <Text style = {Styles.textSelect}> Select Payment Mode
            </Text>
            <TouchableOpacity style = {Styles.buttonDisabled}
                disabled={true}
                onPress = { () => this.props.navigation.navigate('')}
            >
                <View style = {Styles.row}>
                    <Text style = {Styles.text}>Transfer From your Nedbank account</Text>
                    <Image source={arrow}
                        style={Styles.imageContainer}>
                    </Image>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style = {Styles.button}
                onPress = { () => this.props.navigation.navigate('CompletePaymentCreditComponent')}
            >
                <View style = {Styles.row}>
                    <Text style = {Styles.textWhite}>Credit Card</Text>
                    <Image source={arrow}
                        style={Styles.imageContainer}>
                    </Image>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style = {Styles.buttonDisabled}
                disabled={true}
                onPress = { () => this.props.navigation.navigate('')}
            >
                <View style = {Styles.row}>
                    <Text style = {Styles.text}>Debit Card</Text>
                    <Image source={arrow}
                        style={Styles.imageContainer}>
                    </Image>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style = {Styles.buttonDisabled}
                disabled={true}
                onPress = { () => this.props.navigation.navigate('')}
            >
                <View style = {Styles.row}> 
                    <Text style = {Styles.text}>InternetBanking</Text>
                    <Image source={arrow}
                        style={Styles.imageContainer}>
                    </Image>
                </View>
            </TouchableOpacity>
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
        textAlign: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 10
    },
    button: {
        display: 'flex',
        alignItems: 'stretch',
        backgroundColor: '#006041',
        width: '100%'
    },
    buttonDisabled: {
        display: 'flex',
        alignItems: 'stretch',
        backgroundColor: '#DDDDDD',
        width: '100%'
    },
    textSelect: {
        marginLeft: 10,
        textAlign: 'left',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10
    },
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
    }
};

PaymentOptionComponent.propTypes = {
    walletUploadState: PropTypes.shape({
        amountToAdd: PropTypes.number,
        walletBalanceState: PropTypes.shape({
            balance: PropTypes.number
        })
    }),
    navigation: PropTypes.shape ({
        navigate: PropTypes.func
    }).isRequired
};

const mapStateToProps = (state) => ({
    walletUploadState: state.walletUploadState
});

export default connect(mapStateToProps)(PaymentOptionComponent);