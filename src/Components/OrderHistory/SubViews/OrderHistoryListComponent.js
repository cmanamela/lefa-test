import React from 'react';
import { View, 
    StyleSheet, 
    FlatList, 
    Text, 
    TouchableWithoutFeedback, 
    ScrollView,
    Image } from 'react-native';
import PropTypes from 'prop-types';
import { TextMask } from 'react-native-masked-text';
import { formatting } from '../../../Shared/Constants';
import arrow from '../../../Assets/Images/arrow.png';

const numColumns = 1;
const firstIndex = 0;
const eleventhIndex = 10;
class OrderHistoryListComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.actionOnItem = this.setIndex.bind(this);
        this.setTableItems = this.setTableItems.bind(this);
    }

    async componentDidMount(){
        await this.props.getOrders();
    }
    
    setIndex(item) { 
        this.props.setSelectedIndex(item);
        this.props.navigation.navigate('OrderDetailComponent');
    }

    setTableItems({ item, index } ){
        return <TouchableWithoutFeedback onPress= {() => this.setIndex(index)}>
            <View style= {styles.row}>
                <View style = {styles.column}>
                    <View style = {styles.rowOnly}>
                        <Text style= {styles.OrderNo}>Order No:</Text>
                        <Text style= {styles.itemOrder}>{item.number}</Text>
                    </View>
                    <Text style= {styles.itemDate}>{item.completed_at.substring(firstIndex, eleventhIndex)}</Text>
                </View>
                <TextMask style = {styles.itemPrice}
                    value= {item.price}
                    type={'money'}
                    options={formatting}
                />
                <Image source={arrow}
                    style={styles.imageContainer}>
                </Image>
            </View>
        </TouchableWithoutFeedback>;
    }

    render() {
        return <ScrollView> 
            <FlatList 
                data = {this.props.orderHistory}
                keyExtractor = {(item,index) => index.toString()}
                style={styles.view}
                renderItem={this.setTableItems}
                numColumns={numColumns}/>
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    view: { 
        display: 'flex',
        flexGrow: 1
    },
    rowOnly: {
        flexDirection: 'row'
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#F5F5F5',
        borderTopWidth: 2,
        borderTopColor: '#F5F5F5'
    },
    column: {
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 1,
    },
    image: {
        width: 140, 
        height: 100,
        resizeMode: 'contain'
    },
    placeholder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#DDD',
        height: '60%'
    },
    item: {
        backgroundColor: '#FFF',
        flex: 1,
        margin: 1,
        borderBottomWidth: 2,
        borderBottomColor: '#F5F5F5'
    },
    itemOrder: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 2,
        paddingRight: 10
    },
    OrderNo: {
        fontSize: 15,
        paddingLeft: 10,
        paddingRight: 10
    },
    itemPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10
    },
    itemDate: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 10,
        paddingRight: 10
    },
    imageContainer: { 
        width: 13, 
        height: 26,
        flexGrow: 0,
        flexShrink: 0,  
        padding: 5
    }
});

OrderHistoryListComponent.propTypes = {
    getOrders: PropTypes.func,
    orderHistory: PropTypes.array,
    navigation: PropTypes.shape({
        navigate: PropTypes.func
    }),
    setSelectedIndex: PropTypes.func
};

export default OrderHistoryListComponent;