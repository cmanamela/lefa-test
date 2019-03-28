import React, { Component } from 'react';
import { View, Image , Text, StyleSheet, TouchableHighlight } from 'react-native';  
import PropTypes from 'prop-types';
import ImgPage1 from '../../../Assets/Images/homeIcons/1.png';
import ImgPage2 from '../../../Assets/Images/homeIcons/2.png';
import ImgPage3 from '../../../Assets/Images/homeIcons/3.png';
import ImgPage4 from '../../../Assets/Images/homeIcons/4.png'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 24, 
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 1, 
    },
    paymentItemContainer: { 
        width: 85, 
        height: 100,
        alignItems: 'center', 
    },
    paymentItemImageContainer: { 
        width: 30, 
        height: 30 ,
        marginBottom: 8,
        resizeMode: 'contain'
    }
});

class PaymentsComponent extends Component {

    render() {
        return (  
            <View style={styles.container}>  
                <View style={styles.paymentItemContainer}>
                    <TouchableHighlight onPress={()=>this.props.nav('LoginComponent')}>
                        <Image source={ImgPage1}
                            style={styles.paymentItemImageContainer}>
                        </Image>
                    </TouchableHighlight>
                    <Text>Prepaid</Text>
                </View>
                <View style={styles.paymentItemContainer}>
                    <TouchableHighlight onPress={()=>this.props.nav('LoginComponent')}>
                        <Image source={ImgPage2}
                            style={styles.paymentItemImageContainer}>
                        </Image>
                    </TouchableHighlight>
                    <Text>Postpaid</Text>
                </View> 
                <View style={styles.paymentItemContainer}>
                    <TouchableHighlight onPress={()=>this.props.nav('LoginComponent')}>
                        <Image source={ImgPage3}
                            style={styles.paymentItemImageContainer}>
                        </Image>
                    </TouchableHighlight>
                    <Text>Broadband</Text>
                </View> 
                <View style={styles.paymentItemContainer}>
                    <TouchableHighlight onPress={()=>this.props.nav('LoginComponent')}>
                        <Image source={ImgPage4}
                            style={styles.paymentItemImageContainer}>
                        </Image>
                    </TouchableHighlight>
                    <Text>Electricity</Text>
                </View>  
            </View>
        );
    }
}

PaymentsComponent.propTypes = { 
    nav: PropTypes.func.isRequired
};
export default PaymentsComponent;