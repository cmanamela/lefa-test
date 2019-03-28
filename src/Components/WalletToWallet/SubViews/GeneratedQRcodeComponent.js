import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WalletToWalletActions from '../WalletToWalletActions';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';
import wishlist from '../../../Assets/Images/homeIcons/Nedbank_icons_card.png';
import orders from '../../../Assets/Images/homeIcons/Nedbank_icons_Book.png';
import { ScrollView } from 'react-native-gesture-handler';

class GeneratedQRcodeComponent extends Component {
    static navigationOptions = {
        title: 'My Profile ',
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
        this.QRView = this.QRView.bind(this);
    }

    async componentWillMount() { 
        await this.props.WalletToWalletActions.GetMydetails(this.props.loginState.userId,this.props.loginState.jwt);
    }

    QRView() {
        return (      
            <View >
                <QRCode 
                    value={JSON.stringify({
                        walletId: this.props.walletToWalletState.userInfo.walletId,
                        email: this.props.walletToWalletState.userInfo.email,
                        firstName: this.props.walletToWalletState.userInfo.firstName,
                        middleName: this.props.walletToWalletState.userInfo.middleName,
                        surname: this.props.walletToWalletState.userInfo.surname,
                        Lefa: true
                    })}
                    size={300}
                    bgColor="#006041"
                    fgColor="#ffffff"
                />
            </View>
                                                
        );
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.topHalf}>     
                    <Text style={styles.text}>Scan the QR Code to pay</Text>
                    <View style={styles.QRcontainer}>            
                        {this.QRView()}
                    </View>
                    <Text style={styles.textName}>{this.props.walletToWalletState.userInfo.firstName}{' '} {this.props.walletToWalletState.userInfo.surname} </Text>

                </View>
                <ScrollView 
                    contentContainerStyle={styles.contentStyle}
                    style={styles.bottomHalf}>
                    <View style={styles.Kyc}>
                        <View style={styles.col}>
            
                            <Text style={styles.textKyc}>Complete your full KYC to increase your transaction limit </Text>
                
                        </View>
                        <View style={styles.colKYC}>
                            <TouchableHighlight
                                style={styles.buttonKYC}
                            >
                                <Text style={styles.buttontitle}>START KYC</Text>
                            </TouchableHighlight>
                        
                            <Text style={styles.KYCText}>Postpone</Text>
                
                        </View>  
                    </View>
                    <View style={styles.Card}>
            
                        <View>
                        
                            <Text style={styles.title}>Shopping</Text>
                            
                        </View>  
                    </View>
                    <View style={styles.provider}>
                        <Image style={styles.coverIcon} source={wishlist}/> 
                        <View>
                        
                            <Text style={styles.titleKYC}>My Wishlist</Text>
                            
                        </View>  
                    </View>  
                    <View style={styles.provider}>
                        <TouchableHighlight onPress = {() => this.props.navigation.navigate('OrderHistoryComponent')}>
                            <View style={styles.provider}>
                                <Image style={styles.coverIcon} source={orders} />
                                <View>
                                    <Text style={styles.titleKYC}>My Orders</Text>
                                </View>
                            </View>  
                        </TouchableHighlight>   
                    </View>
                </ScrollView>
                
            </View>
            
        );
    }
        
}

GeneratedQRcodeComponent.propTypes = {
    walletToWalletState: PropTypes.shape({
        userInfo: PropTypes.shape({
            userId: PropTypes.string,
            email: PropTypes.string,
            amount: PropTypes.number,
            openScanner: PropTypes.bool,
            firstName: PropTypes.string,
            surname: PropTypes.string,
            middleName: PropTypes.string,
            error: PropTypes.string,
            walletId: PropTypes.string
        })
    }),
    WalletToWalletActions: PropTypes.shape({
        changeuserInfo: PropTypes.func,
        qrScan: PropTypes.func,
        emailPayment: PropTypes.func,
        changeScanInfo: PropTypes.func,
        changeEmailInfo: PropTypes.func,
        GetMydetails: PropTypes.func,
        changeScan: PropTypes.func
    }),
    loginState: PropTypes.shape({
        jwt: PropTypes.string,
        userId: PropTypes.number
    }),
    
    navigation: PropTypes.shape ({
        navigate: PropTypes.func
    })
};
const mapStateToProps = (state) => ({
    walletToWalletState: state.walletToWalletState,
    loginState: state.loginState
});
const mapActionsToProps = (dispatch) => ({
    WalletToWalletActions: bindActionCreators(WalletToWalletActions, dispatch)
});
export default connect(mapStateToProps, mapActionsToProps)(GeneratedQRcodeComponent);
const styles = StyleSheet.create({
    container: {
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2c3539',
        padding: 10,
        width: 300,
        height: 50,
        marginTop: 16,
        marginBottom: '10%'
    },
    contentStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    buttonKYC: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        backgroundColor: '#006041',       
        borderRadius: 20,
        marginBottom: 6,
        padding: 10,
    },
    provider: {
        width: '100%',
        backgroundColor: '#F3EBEB',
        height: 50,
        borderRadius: 5,
        marginTop: 3,
        marginBottom: 3,
        padding: 12,
        flexDirection: 'row',
    }, 
    Card: {
        width: '100%',
        backgroundColor: '#eee',
        height: 60,
        borderRadius: 5,
        marginTop: 3,
        marginBottom: 3,
        padding: 12,
        flexDirection: 'row'
    }, 
    Kyc: {
        backgroundColor: '#59BD5F',
        marginTop: 3,
        marginBottom: 3,
        padding: 12,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }, 
    col: {
        flexGrow: 1,
        flexShrink: 1,
        paddingRight: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },  
    colKYC: {
        flexGrow: 0,
        flexShrink: 0,
        flexDirection: 'column',
        alignItems: 'center'
    }, 
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#006041'
    },
    buttontitle: {
        fontWeight: 'bold',
        color: '#ffffff'
    },
    titleKYC: {
        fontWeight: 'bold',
        color: '#006041'
    },
    KYCText: {
        fontWeight: 'bold'
    },
    heading: { 
        color: 'black', 
        fontSize: 30, 
        alignSelf: 'center', 
        padding: 10
    },
    QRcontainer: {
        position: 'absolute',
        top: 50,
        left: 45

    },
    simpleText: { 
        color: 'black', 
        fontSize: 20, 
        alignSelf: 'center', 
        padding: 10, 
        marginTop: 16
    },
    text: {
        color: '#000',
        fontSize: 16 ,      
        alignSelf: 'center',
        position: 'absolute',
        top: 10
    },
    textKyc: {
        color: '#ffffff',
        fontSize: 15,
    },
    textName: {
        color: '#000',
        fontSize: 30 ,      
        alignSelf: 'center',
        position: 'absolute',
        top: 370
    },
    mainView: {
        display: 'flex', 
        alignSelf: 'stretch'
    },
    topHalf: {
        width: '100%',
        height: '70%',
        alignSelf: 'stretch'
    },
    bottomHalf: {
        width: '100%',
        height: '30%'
    },
    coverImage: { 
        width: '100%', 
        height: '100%'
        
    },
    coverIcon: { 
        width: 30, 
        height: 30,
        padding: 12,
        marginRight: 10
    }
});