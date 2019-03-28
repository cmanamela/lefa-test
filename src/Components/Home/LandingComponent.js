import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';  
import HeaderNavComponent from '../HeaderNav/HeaderNavComponent'; 
import BtmNavigationComponent from '../BtmNavigation/BtmNavigationComponent';
import WalletComponent from './SubViews/WalletComponent';
import ShoppingPayComponent from './SubViews/ShoppingPayComponent';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import * as BalanceActions from './BalanceActions';
import * as ProductActions from '../Shop/ProductActions';
import PaymentOptionsComponent from './SubViews/PaymentOptionsComponent';

const styles = StyleSheet.create({ 
    heading: {  
        fontWeight: 'bold', 
        paddingBottom: 20,
        paddingTop: 20,
        marginLeft: '5%',
    },
    view: {
        height: '100%',
        display: 'flex'
    },
    scrollView: {
        flexGrow: 1,
        flexShrink: 1
    }
});

class LandingComponent extends Component {
    constructor(props){
        super(props);
        this.setFilter = this.setFilter.bind(this);
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            await this.props.balanceActions.RequestBalance(this.props.loginState.userId,this.props.loginState.jwt); 
        }
    }

    componentWillMount(){
        const { productActions } = this.props;        
        const vendorParams = { serviceProviderId: '1',
            match: this.props.loginState.userId };
        productActions.getProductList(vendorParams, this.props.loginState.jwt );
    }

    static navigationOptions = {
        header: null
    };

    setFilter(category){
        this.props.productActions.setProductFilter(category);
    }

    render() {   
        return <View style={styles.view}>    
            <HeaderNavComponent nav={this.props.navigation.navigate}/> 
            <WalletComponent nav={this.props.navigation.navigate}/>   
            <View>
                <Text style={styles.heading}>Recharge or Bill Payments</Text>
                <PaymentOptionsComponent nav={this.props.navigation.navigate}/>
            </View>
            <ScrollView style={styles.scrollView}> 
                <Text style={styles.heading}>Shopping</Text>
                <ShoppingPayComponent 
                    nav={this.props.navigation.navigate}
                    setFilter = {this.setFilter}/>    
            </ScrollView>
            <BtmNavigationComponent nav={this.props.navigation.navigate}/>
        </View>;
    } 
}
LandingComponent.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
    balanceActions: PropTypes.shape ({
        RequestBalance: PropTypes.func
    }),
    productActions: PropTypes.shape ({
        setProductFilter: PropTypes.func
    }),
    loginState: PropTypes.shape({
        jwt: PropTypes.string,
        userInfo: PropTypes.array,
        userId: PropTypes.number,
        spreeJwt: PropTypes.string
    }).isRequired,
    isFocused: PropTypes.bool,

};

const mapStateToProps = (state) => ({
    balanceRequestState: state.balanceRequestState,
    loginState: state.loginState
});

const mapActionsToProps = (dispatch) => ({
    balanceActions: bindActionCreators(BalanceActions, dispatch),
    productActions: bindActionCreators(ProductActions, dispatch)
});

export default withNavigationFocus (connect(mapStateToProps, mapActionsToProps)(LandingComponent));