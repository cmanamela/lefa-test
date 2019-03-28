import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, Image, FlatList, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductActions from '../Shop/ProductActions';
import { TextMask } from 'react-native-masked-text';
import generateImage from '../../Shared/ProductImageHelper/ProductImage';
import { formatting } from '../../Shared/Constants';

const numColumns = 1;
const zero = 0;
class OrderDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.setTableItems = this.setTableItems.bind(this);
    }

    static navigationOptions = {
        title: 'Order Details',
        headerStyle: {
            backgroundColor: '#006041',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    setTableItems({ item }){
        return <View style= {styles.container}>
            {
                this.props.productState.productDetailState && this.props.productState.productDetailState.length > zero &&
                <View style= {styles.productImageContainer}>
                    <Image source= {generateImage(this.props.productState.productDetailState.find((product) => product.name === item.name).category)}
                        style= {styles.productImageStyle}>
                    </Image> 
                </View>
            }
            <View style= {styles.productActions}>
            </View>
            <View>
                <View style= {styles.productSummaryContainer}>
                    <Text style= {styles.product}>{item.name}</Text>
                    <Text> {item.description}</Text>
                    <TextMask style = {styles.boldText}
                        value= {parseFloat(item.price)}
                        type= {'money'}
                        options= {formatting}
                    />
                </View>   
            </View>
        </View>;
    }

    render() {
        return ( 
            <ScrollView>
                <FlatList 
                    data= {this.props.orderHistoryState.orderHistory[this.props.orderHistoryState.index].line_items}
                    keyExtractor= {(item,index) => index.toString()}
                    style= {styles.view}
                    renderItem= {this.setTableItems}
                    numColumns= {numColumns}/>
            </ScrollView>
        );
    }
}

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
        borderRadius: 20, 
        marginLeft: '10%',
        marginRight: '10%',
        width: '50%',
        height: '5%', 
        marginTop: 40,
    },
    shopOption1: {
        backgroundColor: '#bdbdbd',  
        width: '50%',
        height: '5%', 
        borderRadius: 20, 
        marginTop: 90,
    },
    shopOption2: {
        backgroundColor: '#c6c6c6',  
        width: '50%',
        height: '5%',
        paddingBottom: 40,
    },
    submitText: {
        color: '#000',
        textAlign: 'center',
        paddingTop: 5,
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
    }
});

OrderDetailComponent.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func
    }),
    orderHistoryState: PropTypes.shape({
        orderHistory: PropTypes.array,
        index: PropTypes.number
    }),
    productState: PropTypes.shape({
        productDetailState: PropTypes.array
    }),
    loginState: PropTypes.shape({
        jwt: PropTypes.string,
        userId: PropTypes.number,
        spreeJwt: PropTypes.string
    }),
    productActions: PropTypes.shape({
        getProductList: PropTypes.func
    }).isRequired, 
};

const mapStateToProp = (state) => ({
    orderHistoryState: state.orderHistoryState,
    productState: state.productState,
    loginState: state.loginState
});

const mapActionsToProps = (dispatch) => ({
    productActions: bindActionCreators(ProductActions, dispatch)
});

export default connect(mapStateToProp, mapActionsToProps)(OrderDetailComponent);