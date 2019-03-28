import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

const VerifyOTPComponent = (props) => {
    return <View style={Styles.view}>
        <Text>A One Time Password (OTP) has been sent to your mobile number</Text>
        <View style={Styles.inputs}>
            <TextInput
                style={Styles.input}
                onChangeText={props.onOTPChange}
                placeholder="Enter OTP"/>
        </View> 
        <View style={Styles.actions}>
            {
                props.hasError &&
                <Text style={Styles.errorText}>The OTP you entered is incorrect</Text>
            }
            <Button
                buttonStyle={Styles.otpButton}
                titleStyle ={Styles.btntitle}
                disabled={props.confirming || !props.OTPEntered}
                onPress={props.onOTPConfirm}
                title="CONFIRM"/>
        </View>
    </View>;
};

const Styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexGrow: 1
    },
    btntitle: {
        color: '#000',
    },
    otpButton: {
        marginTop: 16,  
        backgroundColor: '#00b388', 
        borderRadius: 20,
        marginLeft: 35,
        marginRight: 35, 
    },
    actions: {
        display: 'flex',
        flexGrow: 0,
        flexShrink: 0
    },
    errorText: {
        color: '#ff0000',
        alignSelf: 'center',
        fontSize: 14,
        paddingBottom: 16
    },
    input: {
        fontSize: 14,
        flexGrow: 1,
        flexShrink: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
});

VerifyOTPComponent.propTypes = {
    hasError: PropTypes.bool,
    confirming: PropTypes.bool,
    OTPEntered: PropTypes.bool,
    onOTPChange: PropTypes.func,
    onOTPConfirm: PropTypes.func
};

export default VerifyOTPComponent;