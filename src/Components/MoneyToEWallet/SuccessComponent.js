import React from 'react';
import { View , Text , TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as LoadActions from './WalletUploadActions';
import * as BalanceActions from '../Home/BalanceActions';
import tick from '../../Assets/Images/successIcon/Success.png';
import { TextMask } from 'react-native-masked-text';
import { formatting } from '../../Shared/Constants';

class SuccessComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.Done = this.Done.bind(this);
    }
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this.props.loadActions.clearLoading();
    }

    loadMore(){
        this.props.loadActions.clearAddMoney();
        this.props.navigation.navigate('SelectAmountComponent');
    }

    async Done(){
        await this.props.balanceActions.RequestBalance(this.props.loginState.userId, this.props.loginState.jwt);
        this.props.navigation.navigate('LandingComponent');
    }

    render() {
        return <View>
            <View style = {Styles.containerGreen}>
                <Image source={tick}
                    style={Styles.imageContainer}>
                </Image>
                <Text style = {Styles.textSuccessful}>Successful!</Text>
                <TextMask style = {Styles.textAdded}
                    value= {this.props.walletUploadState.amountToAdd}
                    type={'money'}
                    options={formatting}
                />
                <Text style = {Styles.textWhite}>Added to your wallet</Text>
            </View>
            <View style = {Styles.containerWhite}>
                <Text style = {Styles.textBlack}>Updated Balance</Text>
                <TextMask style = {Styles.textBalance}
                    value= {this.props.walletUploadState.walletBalanceState.balance}
                    type={'money'}
                    options={ formatting }
                />
                <TouchableOpacity style = {Styles}
                    onPress = {this.loadMore}
                >
                    <Text style = {Styles.textForLoadMore}>+Add more money</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {Styles.button}
                    onPress = { this.Done}
                >
                    <Text style = {Styles.textForButton}>Done</Text>
                </TouchableOpacity>    
            </View>
        </View>;
    }
}

const Styles = {
    containerGreen: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#006041',
        height: '50%'
    },
    containerWhite: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',
        height: '50%'
    },
    textSuccessful: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ffffff'
    },
    textAdded: {
        textAlign: 'center',
        fontSize: 32,
        marginBottom: 10,
        color: '#ffffff'
    },
    textWhite: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
        color: '#ffffff'
    },
    textBlack: {
        textAlign: 'center',
        fontSize: 20,
        color: '#000'
    },
    textBalance: {
        textAlign: 'center',
        fontSize: 32,
        color: '#000'
    },
    buttonLoadMore: {
        alignItems: 'center',
        borderRadius: 25,
        width: '20%'
    },
    textForLoadMore: {
        color: '#006041',
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#006041',
        padding: 10,
        borderRadius: 25,
        width: '60%',
        marginTop: 20
    },
    textForButton: {
        textAlign: 'center',
        color: '#ffffff'
    },
    imageContainer: { 
        width: 50, 
        height: 50 
    }
};

SuccessComponent.propTypes = {
    walletUploadState: PropTypes.shape({
        amountToAdd: PropTypes.number,
        walletBalanceState: PropTypes.shape({
            balance: PropTypes.number,
            walletId: PropTypes.number
        })
    }),
    loginState: PropTypes.shape({
        jwt: PropTypes.string,
        userId: PropTypes.number
    }),
    navigation: PropTypes.shape ({
        navigate: PropTypes.func
    }).isRequired,
    loadActions: PropTypes.shape({
        clearAddMoney: PropTypes.func,
        walletBalance: PropTypes.func,
        clearLoading: PropTypes.func
    }),
    balanceActions: PropTypes.shape ({
        RequestBalance: PropTypes.func
    })
};

const mapStateToProps = (state) => ({
    walletUploadState: state.walletUploadState,
    loginState: state.loginState
});

const mapActionsToProps = (dispatch) => ({
    loadActions: bindActionCreators(LoadActions, dispatch),
    balanceActions: bindActionCreators(BalanceActions, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(SuccessComponent);