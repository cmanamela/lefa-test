import React, { Component } from 'react';
import { View, Image , Text, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import ImgPage6 from '../../../Assets/Images/homeIcons/6.png';
import ImgPage7 from '../../../Assets/Images/homeIcons/7.png';
import ImgPage8 from '../../../Assets/Images/homeIcons/8.png'; 
import ImgPage10 from '../../../Assets/Images/homeIcons/10.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 24, 
    },
    shoppingCategoryContainer: { 
        width: 80, 
        height: 100 ,
        alignItems: 'center', 
    },
    shoppingCategoryImage: { 
        width: 30, 
        height: 30 ,
        marginBottom: 8,
        resizeMode: 'contain'
    }
});

class ShoppingComponent extends Component {
    render() {
        return ( 

            <View style={styles.container}>   
                <View style={styles.shoppingCategoryContainer}>
                    <TouchableHighlight onPress={()=>this.props.nav('LoginComponent')}>
                        <Image source={ImgPage6}
                            style={styles.shoppingCategoryImage}>
                        </Image>
                    </TouchableHighlight>
                    <Text>Phones</Text>
                </View> 
                <View style={styles.shoppingCategoryContainer}>
                    <TouchableHighlight onPress={()=>this.props.nav('LoginComponent')}>
                        <Image source={ImgPage7}
                            style={styles.shoppingCategoryImage}>
                        </Image>
                    </TouchableHighlight>
                    <Text>TVs</Text>
                </View> 
                <View style={styles.shoppingCategoryContainer}>
                    <TouchableHighlight onPress={()=>this.props.nav('LoginComponent')}>
                        <Image source={ImgPage8}
                            style={styles.shoppingCategoryImage}>
                        </Image>
                    </TouchableHighlight>
                    <Text>Laptops</Text>
                </View>
                <View style={styles.shoppingCategoryContainer}>
                    <TouchableHighlight onPress={()=>this.props.nav('LoginComponent')}>
                        <Image source={ImgPage10}
                            style={styles.shoppingCategoryImage}>
                        </Image>
                    </TouchableHighlight>
                    <Text>Womens</Text>
                </View>  
            </View>
        );
    }
}

ShoppingComponent.propTypes = { 
    nav: PropTypes.func.isRequired
};

export default ShoppingComponent;