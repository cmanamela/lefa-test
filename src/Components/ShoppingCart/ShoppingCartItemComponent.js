import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { TextMask } from 'react-native-masked-text';
import PropTypes from 'prop-types'; 
import { formatting } from '../../Shared/Constants';

export default class ShoppingCartItemComponent extends PureComponent {
    render() {
        const { cartItem, spreeJwt, getCart, onRemoveFromCart,onIncrementQuantity, onDecrementQuantity , generateImage } = this.props;
        const {
            category,
            name,
            price,
            total,
            quantity
        } = cartItem;
        
        return (
            <View style={styles.product}>
                <View style={styles.productImage}>
                    <Image 
                        source={generateImage(category)} 
                        style={styles.image} /> 
                </View>
                <View style={styles.productDesc}>
                    <Text style={styles.title}>{name}</Text>
                    <TextMask style = {styles.title}
                        value= {price}
                        type={'money'}
                        options={{ ...formatting,
                            precision: 1
                        }}/>
                    <View style={styles.buttons}>
                        <View style={styles.incDec}>
                            <Text 
                                style={styles.incDecText}
                                onPress={() => onDecrementQuantity(cartItem)}
                            >-</Text>
                            <Text 
                                style={styles.incDecText}
                            >{ quantity }</Text>
                            <Text 
                                style={styles.incDecText}
                                onPress={() => onIncrementQuantity(cartItem)}
                            >+</Text>
                        </View>
                        <TouchableHighlight 
                            style={styles.remove}
                            onPress={() => {
                                onRemoveFromCart(cartItem);
                                getCart(spreeJwt); 
                            }}
                        >
                            <Text style={styles.removeText}>Remove</Text>        
                        </TouchableHighlight>
                    </View>
                </View>
                <View>
                    <TextMask style = {styles.title}
                        value= {total} 
                        type={'money'}
                        options={{ ...formatting,
                            precision: 1
                        }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    product: {
        flexDirection: 'row',
        borderBottomWidth: 3,
        borderBottomColor: '#eee',
        paddingBottom: 5
    },
    buttons: {
        marginTop: 5,
        flexDirection: 'row'
    },
    remove: {
        backgroundColor: '#f00',
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 5
    },
    removeText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    image: {
        width: 80, 
        height: 80,
        resizeMode: 'contain'
    },
    productImg: {
        flex: 1,
        padding: 5
    },
    productDesc: {
        flex: 3,
        paddingLeft: 10
    },
    incDec: {
        width: 70,
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 2,
        paddingLeft: 5,
        paddingRight: 5, 
    },
    incDecText: {
        marginTop: 5,
        fontSize: 20,
    },
    title: {
        fontWeight: 'bold'
    },
});

ShoppingCartItemComponent.propTypes = {
    cartItem: PropTypes.object.isRequired,
    cart: PropTypes.array.isRequired,
    spreeJwt: PropTypes.string.isRequired,
    generateImage: PropTypes.func.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired,
    onIncrementQuantity: PropTypes.func.isRequired,
    onDecrementQuantity: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    updatedQuantity: PropTypes.number
};