import React, { Component } from 'react';
import { View, Image , Text, StyleSheet } from 'react-native';  
import ImgPage1 from '../../../Assets/Images/homeIcons/1.png';
import ImgPage2 from '../../../Assets/Images/homeIcons/2.png';
import ImgPage3 from '../../../Assets/Images/homeIcons/3.png';
import ImgPage4 from '../../../Assets/Images/homeIcons/4.png'; 

const styles = StyleSheet.create({
    container: { 
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 3,
        overflow: 'hidden',
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

export default class PaymentOptionsComponent extends Component {
    render() {
        return (
            <View style={styles.container}>  
                <View style={styles.paymentItemContainer}>
                    <Image source={ImgPage1}
                        style={styles.paymentItemImageContainer}> 
                    </Image>
                    <Text>Prepaid</Text>
                </View> 
                <View style={styles.paymentItemContainer}>
                    <Image source={ImgPage2}
                        style={styles.paymentItemImageContainer}>
                    </Image>
                    <Text>Postpaid</Text>
                </View> 
                <View style={styles.paymentItemContainer}>
                    <Image source={ImgPage3}
                        style={styles.paymentItemImageContainer}>
                    </Image>
                    <Text>Broadband</Text>
                </View> 
                <View style={styles.paymentItemContainer}>
                    <Image source={ImgPage4}
                        style={styles.paymentItemImageContainer}>
                    </Image>
                    <Text>Electricity</Text>
                </View> 
            </View>
        );
    }
}