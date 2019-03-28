import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { CheckBox, Button } from 'react-native-elements'; 

class IdentityDetailsComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
    }
    
    render() {
        const {
            onIdNoChange,
            onNameChange,
            onConfirmDetailChange,
            detailsProvided,
            submitting,
            confirmDetail,
            onSubmit,
            hasError
        } = this.props;

        return <View style={Styles.view}>
            <View 
                overflow="scroll"
                style={Styles.inputs}>
                <View style={Styles.inputContainer}>
                    <TextInput
                        style={Styles.input}
                        placeholder="Your SA ID number"
                        onChangeText={onIdNoChange}/>
                </View>
                <View style={Styles.inputContainer}>
                    <TextInput
                        style={Styles.input}
                        placeholder="Your name (As on SA ID)"
                        onChangeText={onNameChange}/>
                </View>
                <CheckBox
                    checked={confirmDetail}
                    title="Details mentioned above are correct"
                    onPress={onConfirmDetailChange}/>
            </View>
            <View style={Styles.actions}>
                {
                    hasError &&
                    <Text style={Styles.errorText}>Registration failed</Text> 
                }
                <Button
                    buttonStyle={Styles.idButton}
                    titleStyle ={Styles.btntitle}
                    onPress={onSubmit}
                    disabled={submitting || !detailsProvided} 
                    title="SUBMIT"/>
            </View>
        </View>;
    }
}

const Styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexGrow: 1
    },
    inputs: {
        flexGrow: 1,
        flexShrink: 1
    },
    actions: {
        flexShrink: 0,
        flexGrow: 0,
    },
    errorText: {
        color: '#ff0000',
        alignSelf: 'center',
        paddingBottom: 16
    },
    input: {
        fontSize: 14, 
    },
    idButton: {
        marginTop: 16,  
        backgroundColor: '#00b388', 
        borderRadius: 20,
        marginLeft: 35,
        marginRight: 35, 
    },
    btntitle: {
        color: '#000',
    },
    inputContainer: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 24,
    }
});

IdentityDetailsComponent.propTypes = {
    confirmDetail: PropTypes.bool,
    submitting: PropTypes.bool,
    detailsProvided: PropTypes.bool,
    onIdNoChange: PropTypes.func,
    onNameChange: PropTypes.func,
    onConfirmDetailChange: PropTypes.func,
    onSubmit: PropTypes.func,
    hasError: PropTypes.bool
};

export default IdentityDetailsComponent;