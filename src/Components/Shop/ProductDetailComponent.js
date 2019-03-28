import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as shoppingCartActions from '../ShoppingCart/ShoppingCartActions';
import { bindActionCreators } from 'redux';
import { TextMask } from 'react-native-masked-text';
import { formatting } from '../../Shared/Constants';
import generateImage from '../../Shared/ProductImageHelper/ProductImage';
import bag from '../../Assets/Images/shoppingWhite.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    product: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000'
    },
    submit: {  
        backgroundColor: '#00b388',
        borderRadius: 5, 
        margin: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    shopOption1: {
        backgroundColor: '#bdbdbd',  
        width: '50%',
        height: '5%', 
        borderRadius: 20, 
        marginTop: 20,
    },
    shopOption2: {
        backgroundColor: '#c6c6c6',  
        width: '50%',
        height: '5%',
        paddingBottom: 40,
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    }, 
    boldText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    productSummaryContainer: { 
        width: 300, 
        height: 100, 
        paddingTop: 25 
    },
    productActions: { 
        flexDirection: 'row', 
        paddingTop: 25 
    },
    productImageStyle: { 
        width: 300, 
        height: 300, 
        resizeMode: 'contain'
    },
    productImageContainer: { 
        paddingTop: 15 
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    productInfo: {
        marginBottom: 40
    },
    IconBag: { 
        width: 30, 
        height: 30,
        marginRight: 50 
    }
});

class ProductDetailComponent extends Component {

    constructor(props){
        super(props); 
        this.navigateToCart = this.navigateToCart.bind(this);
    }
    
    navigateToCart(){
        this.props.navigation.navigate('LandingComponent');
    }
    static navigationOptions = ({ navigation }) => { 
        return {
            title: 'Product Details',
            headerStyle: {
                backgroundColor: '#006041',
            },
            headerRight: 
            <TouchableHighlight  
                onPress={ () => navigation.navigate('PurchaseSummaryComponent') }>
                <Image source={bag}
                    style={styles.IconBag}>
                </Image> 
            </TouchableHighlight>,
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        };
    }
    async componentWillMount(){
        await this.props.shoppingCartActions.getShoppingCart(this.props.loginState.spreeJwt);
    }
    render() {

        const { adding, addingError } = this.props.cartState;
        const productToAdd = {
            variantId: this.props.productState.selectedProductDetailState.variantId, 
            quantity: 1, 
            jwt: this.props.loginState.spreeJwt
        };
        return ( 
            <View style={styles.container}> 
                <View style={styles.productImageContainer}>
                    <Image source={generateImage(this.props.productState.selectedProductDetailState.category)}
                        style={styles.productImageStyle}>
                    </Image> 
                </View>
                <View style={styles.productActions}>

                </View>
                <View style={styles.productInfo}>
                    <View style={styles.productSummaryContainer}>
                        <Text style={styles.product}>{this.props.productState.selectedProductDetailState.name}</Text>
                        <Text>{this.props.productState.selectedProductDetailState.description}</Text>
                        <TextMask style = {styles.boldText}
                            value= {this.props.productState.selectedProductDetailState.price}
                            type={'money'}
                            options={formatting}
                        />
                    </View>   
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight 
                        onPress={() => this.props.shoppingCartActions.addToCart(productToAdd)}
                        style={styles.submit}
                        underlayColor="#00b388">
                        {adding 
                            ? <ActivityIndicator animating={true} size="small" /> 
                            : <Text style={styles.submitText}>ADD TO CART</Text>
                        }
                        
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={()=>this.props.navigation.navigate('PurchaseSummaryComponent')}
                        style={styles.submit}
                        underlayColor="#00b388">
                        <Text style={styles.submitText}> PROCEED TO CART</Text>
                    </TouchableHighlight>                    
                </View>
                {addingError && <Text>{addingError.message}</Text>}
                <TouchableHighlight 
                    style={styles.shopOption1}
                    onPress={()=>this.props.navigation.navigate('ProductComponent')}
                >
                    <Text style={styles.submitText}> Back To Browse </Text>
                </TouchableHighlight> 
            </View>
        );
    }
}

ProductDetailComponent.propTypes = {
    loginState: PropTypes.shape({
        jwt: PropTypes.string,
        spreeJwt: PropTypes.string,
        userInfo: PropTypes.array,
        userId: PropTypes.number
    }).isRequired,
    productState: PropTypes.shape({
        selectedProductDetailState: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
            price: PropTypes.number,
            serviceProviderId: PropTypes.string,
            productId: PropTypes.string,
            category: PropTypes.string,
            currency: PropTypes.string,
            variantId: PropTypes.string,
            taxonId: PropTypes.string,
            lineItemId: PropTypes.string,
            message: PropTypes.bool
        })
    }).isRequired,
    shoppingCartActions: PropTypes.shape({
        addToCart: PropTypes.func,
        changeItemInCart: PropTypes.func,
        getShoppingCart: PropTypes.func,
        removeFromCart: PropTypes.func    
    }),
    cartState: PropTypes.shape({
        adding: PropTypes.bool,
        addingError: PropTypes.object
    }).isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func
    })
};

const mapStateToProp = (state) => ({
    loginState: state.loginState,
    productState: state.productState,
    cartState: state.cartState
});

const mapActionsToProps = (dispatch) => ({
    shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch)
});
export default connect(mapStateToProp,mapActionsToProps)(ProductDetailComponent);