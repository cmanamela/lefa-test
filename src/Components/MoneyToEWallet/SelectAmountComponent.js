import React from 'react';
import { View , Text , TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoadActions from './WalletUploadActions';
import PropTypes from 'prop-types';
import { TextInputMask, TextMask } from 'react-native-masked-text';
import { formatting } from '../../Shared/Constants';

class SelectAmountComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }
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

    async componentWillMount(){
        await this.props.loadActions.walletBalance( this.props.loginState.userId , this.props.loginState.jwt);
        this.props.loadActions.clearAddMoney();
    }

    update(value){
        return () => {
            this.props.loadActions.addMoney( this.props.walletUploadState.amountToAdd + value);
        };
    }

    removeCharacter(str_to_remove, str) {
        let reg = new RegExp(str_to_remove);
        return str.replace(reg, '');
    }

    updateOnChange(value){
        const zero = 0;
        const one = 1;
        const val = this.removeCharacter(',',value.substring(one));
        this.props.loadActions.addMoney(parseInt(val) || zero );
    }

    render() {
        const zero = 0;
        const hundred = 100;
        const twoHundred = 200;
        const fiveHundred = 500;
        const values = [ hundred, twoHundred, fiveHundred ];

        return <View style = {Styles.container} >
            {this.props.walletUploadState.walletBalanceState.verifying ? 
                null :
                <TextMask style = {Styles.textBalance}
                    value= { this.props.walletUploadState.walletBalanceState.balance }
                    type={'money'}
                    options={{
                        ...formatting,
                        unit: 'Current Balance R', 
                    }}
                />
            }
            <TextInputMask style = {Styles.textAmount}
                type={'money'}
                options={{
                    ...formatting,
                    precision: zero    
                }}
                value = {this.props.walletUploadState.amountToAdd.toString()}
                keyboardType = "numeric"
                onChangeText = { value => {
                    this.updateOnChange(value);
                }}
            />
            <View style = {Styles.row}>
                {
                    values.map((value, index) => <TouchableOpacity style = {Styles.buttonAmount}
                        onPress={ this.update(value)}
                        key={index}
                    >
                        <Text style = {Styles.textWhite}>{`+R${value}`}</Text>
                    </TouchableOpacity>)
                }
            </View>
            <TouchableOpacity style = {Styles.buttonAdd}
                onPress = { () => this.props.navigation.navigate('PaymentOptionComponent')}
            >
                <Text style = {Styles.textWhite}>ADD MONEY</Text>
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
    textBalance: {
        fontSize: 20,
        textAlign: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 10
    },
    textAmount: {
        fontSize: 40,
        textAlign: 'center',
        flexDirection: 'row',
        color: '#006041',
        borderBottomWidth: 0.5  
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10
    },
    buttonAmount: {
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        backgroundColor: '#006041',
        padding: 10,
        borderRadius: 25,
        width: '20%'
    },
    buttonAdd: {
        alignItems: 'center',
        backgroundColor: '#006041',
        padding: 10,
        borderRadius: 25,
        width: '60%'
    },
    textWhite: {
        color: '#FFFFFF',
        textAlign: 'center'
    }
};

SelectAmountComponent.propTypes = {
    loadActions: PropTypes.shape({
        addMoney: PropTypes.func,
        walletBalance: PropTypes.func,
        clearAddMoney: PropTypes.func
    }).isRequired,
    walletUploadState: PropTypes.shape({
        amountToAdd: PropTypes.number,
        walletBalanceState: PropTypes.shape({
            balance: PropTypes.number,
            verifying: PropTypes.bool
        })
    }),
    navigation: PropTypes.shape ({
        navigate: PropTypes.func
    }).isRequired,
    loginState: PropTypes.shape({
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

export default connect(mapStateToProps, mapActionsToProps)(SelectAmountComponent);