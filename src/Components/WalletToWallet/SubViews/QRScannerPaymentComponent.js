import React, { Component } from 'react';
import { View, PermissionsAndroid, Platform, StyleSheet, Text } from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WalletToWalletActions from '../WalletToWalletActions';
import PropTypes from 'prop-types';

class QRScannerPaymentComponent extends Component {

    static navigationOptions = {
        title: 'Scan QR Code ',
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
        this.requestCameraPermission = this.requestCameraPermission.bind(this);
        this.onOpenScanner = this.onOpenScanner.bind(this);
        
    }
    async componentDidMount(){
        await this.onOpenScanner();
    }
        
    onBarcodeScan(event) {
        const data = JSON.parse(event);
        if (data.Lefa){
            this.props.WalletToWalletActions.qrScan(data);
            if (this.props.walletToWalletState.userInfo.error === null) {                
                this.props.WalletToWalletActions.changeScanInfo();
                this.props.navigation.navigate('PayToPersonComponent');
    
            } else {
                alert('Scanning Code failed try again');
            }

        }   
    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,{
                    'title': 'LEFA App Camera Permission',
                    'message': 'LEFA App needs access to your camera '
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.props.WalletToWalletActions.changeScanInfo();
            } else {
                alert('CAMERA permission denied');
            }
        } catch (err) {
            alert('Camera permission err',err);
        }
    }

    async onOpenScanner() {
        if (Platform.OS === 'android'){
            await this.requestCameraPermission();
        } else {
            this.props.WalletToWalletActions.changeScanInfo();
        }    
    }
    static navigationOptions(){ 
        return { title: 'Scan Payment' }; 
    }
    render() { 
        return (
        
            this.props.walletToWalletState.userInfo.openScanner &&
            <View style={styles.container}>                          
                { this.props.walletToWalletState.userInfo.openScanner ?
                    <CameraKitCameraScreen
                        showFrame={false}
                        scanBarcode={true}
                        laserColor={'green'}
                        frameColor={'white'}
                        colorForScannerFrame={'black'}
                        onReadCode={event => this.onBarcodeScan(event.nativeEvent.codeStringValue)
                        }
                    /> : null}
            </View> ||
            <View>
                <Text>You have not allowed camera permissions</Text>    
            </View>
                    
        );
    }
}

QRScannerPaymentComponent.propTypes = {
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
        email: PropTypes.string,
        username: PropTypes.string,
        jwt: PropTypes.string,
        userInfo: PropTypes.array,
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
export default connect(mapStateToProps, mapActionsToProps)(QRScannerPaymentComponent);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
    heading: { 
        color: 'black', 
        fontSize: 24, 
        alignSelf: 'center', 
        padding: 10, 
        marginTop: 30 
    }
    
});