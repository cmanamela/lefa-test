import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const StepComponent = (props) => {
    return <View style={Styles.stepContainer}>
        <View styles={Styles.stepImage}>
            <Text style={[ Styles.step, props.isActive && Styles.activeStep ]}></Text>
        </View>
        <Text style={props.isActive ? Styles.activeStepText : Styles.stepText}>{props.label}</Text>
    </View>;
};

StepComponent.propTypes = {
    label: PropTypes.string,
    isActive: PropTypes.bool
};

const StepsComponent = (props) => {
    const arrayIncrement = 1;

    return <View style={Styles.container}>
        <View style={Styles.stepSequence}>
            {
                props.steps.map((step, index, arr) => <React.Fragment
                    key={index}>
                    <StepComponent
                        key={index}
                        isActive={index === props.currentStepIndex} 
                        label={step}
                        completed={props.currentStepIndex > index}/>
                    {
                        index < arr.length - arrayIncrement &&
                        <View style={Styles.background}></View>
                    }
                </React.Fragment>
                )
            }
        </View>
    </View>;
};

const Styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignSelf: 'stretch',
        paddingBottom: 24
    },
    step: { 
        height: 30,
        width: 30,
        borderRadius: 20,
        borderWidth: 2,
        marginTop: 12
    },
    stepSequence: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderBottomWidth: 0.5 ,
        paddingBottom: 20
    },
    background: {
        height: 1,
        flexGrow: 1,
        backgroundColor: '#000000'
    },
    stepContainer: {
        flexGrow: 0,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center'
    },
    activeStep: {
        backgroundColor: '#006041',
    },
    stepImage: {
        height: 18,
        width: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#00f',
        borderRadius: 20,
        backgroundColor: '#215200'
    },
    stepText: {},
    activeStepText: {
        fontWeight: 'bold', 
    }
});

StepsComponent.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string),
    currentStepIndex: PropTypes.number.isRequired
};

export default StepsComponent;