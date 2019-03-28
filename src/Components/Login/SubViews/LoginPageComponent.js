import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { 
    Text, 
    View, 
    TextInput, 
    StyleSheet, 
    TouchableHighlight, 
    ToastAndroid,
    Image,
    ActivityIndicator
} from 'react-native';
import nedbankLogo from '../nb.png';
import { ScrollView } from 'react-native-gesture-handler';

export default class LoginPageComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            passwordHidden: true
        };

        this.passwordRef = React.createRef();
        this.nedbankMoneyLogin = this.nedbankMoneyLogin.bind(this);
        this.focusNext = this.focusNext.bind(this);
        this.showHidePassword = this.showHidePassword.bind(this);
    }
    
    showHidePassword() {
        this.setState({
            passwordHidden: !this.state.passwordHidden
        });
    }

    nedbankMoneyLogin(){
        ToastAndroid.show('Logging in...With Nedbank Money', ToastAndroid.SHORT);
    }
    
    focusNext(nextInputRef){
        nextInputRef.current.focus();
    }

    async submitSecureLogin(loginDetails, email){
        const loginInfo = await this.props.onSecureLogin(loginDetails);

        if (loginInfo) {
            const jwt = loginInfo.headerValue;
            await this.props.onGetUserInfoByUsername(email, jwt);
            this.props.navigate('LandingComponent');
        }
    }

    render() {
        const { 
            email,
            password,
            error,
            loading,
            onChangeEmail,
            onChangePassword,
            navigate
        } = this.props;

        const loginDetails = {
            identity: email,
            password: password
        };

        const { passwordHidden } = this.state;

        return (
            <ScrollView 
                contentContainerStyle={styles.container}>
                <View style={styles.main} >
                    <View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                textContentType="username"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() => this.focusNext(this.passwordRef)}
                                onChangeText={onChangeEmail}
                                blurOnSubmit={false}
                                placeholder="Email" />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                textContentType="newPassword"
                                onChangeText={onChangePassword}
                                secureTextEntry={passwordHidden}
                                placeholder="Password"
                                blurOnSubmit={false}
                                ref={this.passwordRef} />

                            <Text 
                                style={styles.passwordToggle}
                                onPress={this.showHidePassword}
                            >{passwordHidden ? 'Show' : 'Hide' }</Text>
                        </View>
                    </View>

                    <View style={styles.authActionsContainer}>
                        <View style={styles.tnc}>
                            <Text
                                style={styles.terms}
                            >
                                By logging in, I agree to the Terms & Conditions & Privacy Policy
                            </Text>
                        </View>
    
                        {
                            error && error.length &&
                            <Text style={ styles.error }>{ error }</Text>
                        }
                        
                        <TouchableHighlight 
                            style={styles.submit} 
                            underlayColor="#006041" 
                            onPress={ () => this.submitSecureLogin(loginDetails, email)}
                        >
                            {loading 
                                ? <ActivityIndicator animating={true} size="small" /> 
                                : <Text style={styles.submitText}>LOGIN</Text>
                            }
                        </TouchableHighlight>                       

                        <Text style={styles.terms}>
                            Dont you have an account yet?&nbsp;
                            <Text style={styles.register} 
                                onPress={ () => navigate('RegisterComponent') }
                            >
                                REGISTER NOW
                            </Text>
                        </Text>

                        <View style={styles.orContainer}>
                            <View style={styles.hr} />
                            <Text style={styles.or}>OR</Text>
                        </View>

                        <TouchableHighlight
                            style={styles.submit}
                            underlayColor="rgb(0,99,65)"
                            onPress={this.nedbankMoneyLogin}
                        >
                            <Text style={styles.submitText}>LOGIN WITH NEDBANK MONEY</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text>Powered & secured by</Text>
                    <Image
                        style={styles.img}
                        source={nedbankLogo}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    authActionsContainer: {
        marginTop: 16,
        marginBottom: 60
    },
    orContainer: { 
        marginTop: 24,
        height: 30, 
        justifyContent: 'center', 
        overflow: 'hidden' 
    },
    header: {
        width: '100%',
        fontSize: 16,
        backgroundColor: 'white'
    },
    back: {
        color: 'green',
        borderRadius: 10,
        fontSize: 20
    },
    container: {
        flexGrow: 1,
        paddingTop: 24,
        display: 'flex',
    },
    submit: {
        marginRight: 40,
        marginLeft: 40,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: 'rgb(0,99,65)',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 24
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15
    },
    or: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'center',
        bottom: 1
    },
    hr: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        top: 15
    },
    input: {
        fontSize: 14,
        flexGrow: 1,
        flexShrink: 1
    },
    register: {
        color: '#006041',
        fontWeight: 'bold'
    },
    main: {
        flexGrow: 1,
        marginLeft: 24,
        marginRight: 24,
        textAlign: 'center',
        justifyContent: 'space-between'
    },
    footer: {
        backgroundColor: '#eee',
        flexGrow: 0,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 24,
        flexShrink: 0
    },
    footerText: {
        flex: 1,
        flexDirection: 'row'
    },
    contact: {
        borderColor: '#121212',
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 5,
        marginLeft: 5,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        height: 18
    },
    img: {
        width: 30,
        height: 30,
        marginTop: 8
    },
    terms: {
        marginTop: 24,
        fontSize: 12,
        textAlign: 'center'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 24,
        alignItems: 'center',
    },
    passwordToggle: {
        color: '#006041',
        fontWeight: '500'
    },
    error: {
        marginTop: 24,
        color: '#f00',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

LoginPageComponent.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool,
    jwt: PropTypes.string,
    userInfo: PropTypes.array,
    onChangeEmail: PropTypes.func,
    onChangePassword: PropTypes.func,
    onSecureLogin: PropTypes.func,
    onGetUserInfoByUsername: PropTypes.func,
    navigate: PropTypes.func
};