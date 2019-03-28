import React from 'react';
import { View, Image , Text, StyleSheet, TouchableHighlight } from 'react-native';   
import PropTypes from 'prop-types';
import HomeCover from '../../../Assets/Images/homeIcons/rocket.png';

const styles = StyleSheet.create({
    container: { 
        paddingBottom: 25,
    },
    submit: {  
        backgroundColor: '#00b388',
        borderRadius: 22, 
        marginLeft: '25%',
        marginRight: '25%',
        width: '50%',
        position: 'absolute',
        top: '94%',
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        paddingTop: 12,
        paddingBottom: 12,
    }, 
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    coverImage: { 
        width: 500, 
        height: 350,
        resizeMode: 'cover' 
    },
    Intro: {
        width: 200,
        height: 150, 
        position: 'absolute',
        right: 10,
        top: 80
    },
    txtAcc: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        position: 'absolute',
        top: -25,
        left: 40,
    },
    txtAccNum: {
        color: '#fff',
        fontSize: 80,
        fontWeight: 'bold',
        position: 'absolute',
        top: -20,
        left: 60, 
    },
    txtSimple: {
        color: '#fff',
        fontSize: 20,  
        right: 25,
        position: 'absolute',
        top: 5,  
    },
    txtSteps: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '100',  
        right: 30,
        position: 'absolute',
        top: 25, 
    }
});

class IntroductionComponent extends React.PureComponent { 
    render() { 
        return <View style={styles.container}> 
            <Image source={HomeCover}
                style={styles.coverImage}>
            </Image>
            <TouchableHighlight
                onPress={()=>this.props.nav('RegisterComponent')}
                style={styles.submit}
                underlayColor="#fff">
                <Text style={styles.submitText}>LETS GET STARTED</Text>
            </TouchableHighlight>
            <View style={styles.Intro}>
                <Text style={styles.txtAcc}>OPEN ACCOUNT IN </Text>
                <Text style={styles.txtAccNum}>3</Text>
                <Text style={styles.txtSimple}>Simple</Text>
                <Text style={styles.txtSteps}>Steps</Text>
            </View>
        </View>;
    }
}

IntroductionComponent.propTypes = { 
    nav: PropTypes.func.isRequired
};

export default IntroductionComponent;