import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActions from './OrderHistoryActions';
import OrderHistoryListComponent from './SubViews/OrderHistoryListComponent';

class OrderHistoryComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getOrderList = this.getOrderList.bind(this);
    }
    
    async getOrderList() {
        await this.props.orderActions.getOrderHistory(this.props.loginState.spreeJwt);
    }

    static navigationOptions = () => {
        return {
            title: 'Order History',
            headerStyle: {
                backgroundColor: '#006041',
                
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
                flex: 1
            }
        };
    };
    
    render() {     
        return <View style={Styles.view}>
            <OrderHistoryListComponent
                getOrders = {this.getOrderList}
                orderHistory = {this.props.orderHistoryState.orderHistory}
                setSelectedIndex = {this.props.orderActions.setSelectedIndex}
                navigation = { this.props.navigation }
            />
        </View>;
    }
}

const Styles = {
    view: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
};

OrderHistoryComponent.propTypes = {  
    orderHistoryState: PropTypes.shape ({
        orderHistory: PropTypes.array
    }),
    loginState: PropTypes.shape ({
        spreeJwt: PropTypes.string
    }),
    orderActions: PropTypes.shape ({
        getOrderHistory: PropTypes.func,
        setSelectedIndex: PropTypes.func
    }),
    navigation: PropTypes.shape ({
        navigate: PropTypes.func
    })
};

const mapStateToProps = (state) => ({
    orderHistoryState: state.orderHistoryState,
    loginState: state.loginState
});

const mapActionsToProps = (dispatch) => ({
    orderActions: bindActionCreators(OrderActions, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(OrderHistoryComponent);