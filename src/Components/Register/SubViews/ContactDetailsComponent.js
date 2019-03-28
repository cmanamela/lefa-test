import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types'; 

class ContactDetailsComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.passwordRef = React.createRef();
        this.emailRef = React.createRef();

        this.focusNext = this.focusNext.bind(this);
    }

    focusNext(nextInputRef) {
        nextInputRef.current.focus();
    }
    
    render() {
        const {
            onCellNoChange,
            onEmailChange,
            onPasswordChange,
            onSubmit,
            onRequestToLogin,
            detailsProvided,
            requestingOTP
        } = this.props;

        return <View style={Styles.view}>
            <View 
                overflow="scroll"
                style={Styles.inputSection}>
                <View style={Styles.inputContainer}>
                    <TextInput 
                        style={Styles.input}
                        onChangeText={onCellNoChange}
                        textContentType="username"
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        onSubmitEditing={() => this.focusNext(this.passwordRef)}
                        blurOnSubmit={false}
                        placeholder="Mobile Number"/>
                </View>
                <View style={Styles.inputContainer}>
                    <TextInput
                        style={Styles.input} 
                        onChangeText={onPasswordChange}
                        textContentType="newPassword"
                        secureTextEntry={true}
                        returnKeyType="next"
                        placeholder="Password"
                        onSubmitEditing={() => this.focusNext(this.emailRef)}
                        blurOnSubmit={false}
                        ref={this.passwordRef}/>
                </View>
                <View style={Styles.inputContainer}>
                    <TextInput 
                        style={Styles.input}
                        onChangeText={onEmailChange}
                        textContentType="emailAddress"
                        autoComplete="email"
                        keyboardType="email-address"
                        returnKeyLabel="Submit"
                        returnKeyType="done"
                        placeholder="Email"
                        blurOnSubmit={false}
                        onSubmitEditing={onSubmit}
                        ref={this.emailRef}/>
                </View>
            </View>
            <View style={Styles.actionSection}> 
                <Button
                    disabled={requestingOTP || !detailsProvided}
                    buttonStyle={Styles.proceedButton}
                    onPress={onSubmit} 
                    titleStyle ={Styles.btntitle}
                    title="PROCEED"/>
                <View style={Styles.alreadyRegisteredContainer}>
                    <Text style={Styles.alreadyRegisteredText}>
                        Already a user?&nbsp;
                        <Text 
                            style={Styles.loginLabel} 
                            onPress={onRequestToLogin}>
                            LOGIN
                        </Text>
                    </Text>
                </View>
            </View>
        </View>;
    }
}

const Styles = StyleSheet.create({
    view: { 
        display: 'flex',
        flexGrow: 1
    }, 
    inputSection: {
        flexShrink: 1,
        flexGrow: 1,
    },
    actionSection: {
        flexShrink: 0,
        flexGrow: 0
    },
    proceedButton: {
        marginTop: 16,  
        backgroundColor: '#00b388', 
        borderRadius: 20, 
        marginLeft: 35,
        marginRight: 35, 
    },
    btntitle: {
        color: '#000',
    },
    alreadyRegisteredContainer: { 
        alignSelf: 'center', 
        paddingTop: 16 
    },
    alreadyRegisteredText: {
        fontSize: 14
    },
    loginLabel: {
        paddingLeft: 16,
        fontWeight: 'bold',
        color: '#006041'
    },
    input: {
        fontSize: 14,
    },
    inputContainer: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 24,
    }
});

ContactDetailsComponent.propTypes = {
    requestingOTP: PropTypes.bool,
    detailsProvided: PropTypes.bool,
    onCellNoChange: PropTypes.func,
    onEmailChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onRequestToLogin: PropTypes.func
};

export default ContactDetailsComponent;