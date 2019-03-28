import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductActions from './ProductActions';
import PropTypes from 'prop-types';
import ProductListComponent from './SubViews/ProductListComponent';

class ProductComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.getProductList = this.getProductList.bind(this);
        this.setSelectedProduct = this.setSelectedProduct.bind(this);
        this.callKafkaAPI = this.callKafkaAPI.bind(this);
    }  

    async getProductList() {
        const { productActions } = this.props;        
        const vendorParams = { serviceProviderId: '1',
            match: this.props.loginState.userId };
        await productActions.getProductList(vendorParams, this.props.loginState.jwt );
    }   

    setSelectedProduct(selectedProduct){
        const { productActions } = this.props;
        productActions.setSelectedProduct(selectedProduct);
    }

    callKafkaAPI(kafkaInfo){
        const { productActions } = this.props;
        productActions.makeKafkaCall(kafkaInfo);
    }
 
    static navigationOptions({ navigation }) {
        const { params = {} } = navigation.state; 
        return {
            title: params.category,
            headerStyle: {
                backgroundColor: '#006041',
            }, 
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        };
    }
    
    componentWillMount(){
        this.props.navigation.setParams({ category: this.props.productState.filterCategory });
    }
    
    render() {
        return <View style={style.view}> 
            <ProductListComponent
                getProducts={this.getProductList}
                productDetails = {this.props.productState.productDetailState}
                selectedProductDetails = {this.props.productState.selectedProductDetailState}
                setSelectedProduct = {this.setSelectedProduct}
                makeKafkaCall = {this.callKafkaAPI}
                filterCategory = {this.props.productState.filterCategory}
                userId = {this.props.loginState.userId}
                navigation = { this.props.navigation }
            />
        </View>;
    }
}

ProductComponent.propTypes = {
    productState: PropTypes.shape({
        productDetailState: PropTypes.array,
        selectedProductDetailState: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
            price: PropTypes.number,
            serviceProvider: PropTypes.string
        }),
        filterCategory: PropTypes.string
    }),
    loginState: PropTypes.shape({
        jwt: PropTypes.string,
        userId: PropTypes.number,
        spreeJwt: PropTypes.string
    }),
    productActions: PropTypes.shape({
        getProductList: PropTypes.func,
        setSelectedProduct: PropTypes.func,
        callKafkaAPI: PropTypes.func
    }).isRequired,    
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setParams: PropTypes.func,
        state: PropTypes.shape({
            params: PropTypes.shape({
                category: PropTypes.string
            })
        })
    }).isRequired,
    purchaseSummaryState: PropTypes.shape({  
        total: PropTypes.number
    })
};

const style = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    IconBag: { 
        width: 30, 
        height: 30 ,
        marginRight: 50 
    }
});

const mapStateToProps = (state) => ({
    productState: state.productState,
    loginState: state.loginState
});

const mapActionsToProps = (dispatch) => ({
    productActions: bindActionCreators(ProductActions, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(ProductComponent);