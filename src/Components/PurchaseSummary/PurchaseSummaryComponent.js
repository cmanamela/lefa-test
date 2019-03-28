import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as purchaseSummaryActions from './PurchaseSummaryActions';
import * as shoppingCartActions from '../ShoppingCart/ShoppingCartActions';
import providerLogo from '../Login/nb.png';
import { TextMask } from 'react-native-masked-text';
import ShoppingCartItemComponent from '../ShoppingCart/ShoppingCartItemComponent';
import generateImage from '../../Shared/ProductImageHelper/ProductImage';
import { formatting } from '../../Shared/Constants';
import { 
    Text, 
    View, 
    StyleSheet,
    TouchableHighlight,
    Image,
    CheckBox,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import debounce from 'lodash.debounce';

class PurchaseSummaryComponent extends PureComponent {
    constructor(props){
        super(props);

        const changeQuantityMillis = 300;
        this.incrementQuantity = this.incrementQuantity.bind(this);
        this.decrementQuantity = this.decrementQuantity.bind(this);
        this.changeQuantity = debounce(this.changeQuantity.bind(this), changeQuantityMillis);
    }
    componentDidMount(){
        this.props.purchaseSummaryActions.updatePurchaseItemTotal(this.props.productState.price);
    }

    async componentWillMount(){
        await this.props.shoppingCartActions.getShoppingCart(this.props.loginState.spreeJwt);
    }

    static navigationOptions = {
        title: 'My Cart',
        headerStyle: {
            backgroundColor: '#006041',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    incrementQuantity(updatedProduct){
        const incrementBy = 1;
        
        const newCart = this.props.cartState.cart.map(cartItem => {
            if (cartItem.lineItemId === updatedProduct.lineItemId) {
                cartItem.quantity += incrementBy;
            }

            return cartItem;
        });

        this.props.shoppingCartActions.changeQuantity(newCart);
        this.changeQuantity(updatedProduct);
    }
        
    decrementQuantity(updatedProduct){
        const decrementBy = 1;
        const min = 1;

        const newCart = this.props.cartState.cart.map(cartItem => {
            if (cartItem.lineItemId === updatedProduct.lineItemId) {
                cartItem.quantity -= decrementBy;
                cartItem.quantity = cartItem.quantity >= min ? cartItem.quantity : min;
            }

            return cartItem;
        });

        this.props.shoppingCartActions.changeQuantity(newCart);
        this.changeQuantity(updatedProduct);
    }

    changeQuantity(product) {
        const spreeJwt = this.props.loginState.spreeJwt;
        this.props.shoppingCartActions.changeItemInCart(product, spreeJwt);
    }

    render() {
        const { userInfo, spreeJwt } = this.props.loginState;
        const { total } = this.props.cartState;
        const userIndex = 0;

        const mapCartItems = this.props.cartState.cart.map((item, index) => {
            if (this.props.cartState.fetching){
                return <ActivityIndicator animating={true} size="large" />; 
            } else {
                return (
                    <ShoppingCartItemComponent
                        key={index}
                        cartItem={item}
                        cart={this.props.cartState.cart}
                        updatedQuantity={this.props.cartState.updatedQuantity}
                        getCart={this.props.shoppingCartActions.getShoppingCart}
                        spreeJwt={spreeJwt}
                        onIncrementQuantity={this.incrementQuantity}
                        onDecrementQuantity={this.decrementQuantity}
                        onRemoveFromCart={this.props.shoppingCartActions.removeFromCart}
                        generateImage={generateImage} />
                );
            }
        });

        return (
            <ScrollView style={styles.container}>
                <View style={styles.delivery}>
                    <Text style={styles.title}>Delivery Address:</Text>
                    <Text>{userInfo[userIndex].userAddresses}</Text>
                    <Text style={styles.link}>Change Address</Text>
                </View>
                <View style={styles.main}>
                    <View>
                        { mapCartItems }
                        {
                            this.props.cartState.itemsTotal ?
                                <TouchableHighlight 
                                    style={styles.clearButton}
                                    onPress={() => this.props.shoppingCartActions.clearSpreeCart(spreeJwt)}
                                >
                                    <Text style={styles.clearText}>Clear Cart</Text>
                                </TouchableHighlight> :
                                <Text style={styles.emptyCart}>Your cart is Empty!</Text>
                        }
                    </View>
                    <View style={styles.check}>
                        <CheckBox />
                        <View>
                            <Text>Free shipping</Text>
                            <Text style={styles.title}>Delivery by 28th April, 08:00 pm</Text>
                            <Text style={styles.link}>View Details</Text>
                        </View> 
                    </View>
                    <View style={styles.check}>
                        <CheckBox />
                        <View>
                            <Text>Items can be Returned and cancelled.</Text>
                            <Text style={styles.link}>View Details</Text>
                        </View> 
                    </View>
                    <View style={styles.provider}>
                        <Image source={providerLogo}/>
                        <View>
                            <Text style={styles.title}>Buying from</Text>
                            <Text>service provider</Text>
                        </View>  
                    </View>
                    <View>
                        <Text style={styles.title}>Payment Summary</Text>
                        <View style={styles.amount}>
                            <Text>Subtotal</Text>
                            <TextMask
                                value={ total }
                                type={'money'}
                                options={{ ...formatting,
                                    precision: 1
                                }}
                            />
                        </View>
                        <View style={styles.amount}>
                            <Text>Shipping</Text>
                            <Text>Free</Text>
                        </View>
                        <View style={[ styles.amount, styles.hr ]}>
                            <Text style={styles.title}>BAG TOTAL</Text>
                            <TextMask
                                value= { total }
                                type={'money'}
                                options={{ ...formatting,
                                    precision: 1
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text>Buy on credit</Text>
                        </View>
                        <View>
                            <Text>Buy on credit with Nedbank</Text>
                            <Text>Earn additional 10% cashback</Text>
                        </View>
                    </View>
                    <View style={styles.offer}>
                        <View>

                        </View>
                        <View>
                            <Text>Offer 1 Applied</Text>
                            <Text>You will receive a cashback of R10</Text>
                            <Text>The ampunt show up in your wallet in the next 24 hours</Text>
                        </View>
                    </View>
                    <View> 
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('PaymentOptionsComponent')}
                        >
                            <Text style={styles.btnText}>BUY NOW</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        height: '100%',
        alignSelf: 'stretch'
    },
    clearButton: {
        width: '100%',
        height: 30,
        backgroundColor: '#f00',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyCart: {
        alignSelf: 'center',
        fontSize: 30
    },
    clearText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    amount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10
    },
    hr: {
        borderTopWidth: 2,
        borderTopColor: '#ccc'
    },
    image: {
        width: 110, 
        height: 100,
        resizeMode: 'contain'
    },
    product: {
        flexDirection: 'row'
    },
    check: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 5
    },
    provider: {
        width: '100%',
        backgroundColor: '#eee',
        height: 50,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        padding: 4,
        flexDirection: 'row'
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
    delivery: {
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    title: {
        fontWeight: 'bold'
    },
    main: {
        flex: 10,
        alignSelf: 'stretch',
        paddingTop: 20
    },
    link: {
        color: '#00f',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'rgb(0,99,65)',
        height: 45,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    btnText: {
        color: '#fff',
    }
});

PurchaseSummaryComponent.propTypes = {
    loginState: PropTypes.shape({
        jwt: PropTypes.string,
        spreeJwt: PropTypes.string,
        userInfo: PropTypes.array,
        userId: PropTypes.number
    }).isRequired,
    navigation: PropTypes.object.isRequired,
    purchaseSummaryState: PropTypes.shape({
        productId: PropTypes.string,
        quantity: PropTypes.number,
        total: PropTypes.string
    }).isRequired,
    purchaseSummaryActions: PropTypes.shape({
        decrementPurchaseItemQuantity: PropTypes.func,
        incrementPurchaseItemQuantity: PropTypes.func,
        updatePurchaseItemTotal: PropTypes.func
    }).isRequired,
    productState: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
        productId: PropTypes.number,
        category: PropTypes.string
    }).isRequired,
    cartState: PropTypes.shape({
        cart: PropTypes.array,
        total: PropTypes.number,
        itemsTotal: PropTypes.number,
        fetching: PropTypes.bool,
        fetchingError: PropTypes.string,
        updatedQuantity: PropTypes.number
    }).isRequired,
    shoppingCartActions: PropTypes.shape({
        getShoppingCart: PropTypes.func,
        deleteItemFromCart: PropTypes.func,
        removeFromCart: PropTypes.func,
        clearSpreeCart: PropTypes.func,
        changeItemInCart: PropTypes.func,
        changeQuantity: PropTypes.func
    }).isRequired
};

const mapStateToProp = (state) => ({
    loginState: state.loginState,
    purchaseSummaryState: state.purchaseSummaryState,
    productState: state.productState.selectedProductDetailState,
    cartState: state.cartState
});

const mapActionsToProps = (dispach) => ({
    purchaseSummaryActions: bindActionCreators(purchaseSummaryActions, dispach),
    shoppingCartActions: bindActionCreators(shoppingCartActions, dispach)
});

export default connect(mapStateToProp, mapActionsToProps)(PurchaseSummaryComponent);