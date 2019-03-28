import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableWithoutFeedback,
    ScrollView,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import { TextMask } from 'react-native-masked-text';
import { formatting } from '../../../Shared/Constants';
import generateImage from '../../../Shared/ProductImageHelper/ProductImage';

const numColumns = 2;
class ProductListComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.setTableItems = this.setTableItems.bind(this);
        this.setFilteredList = this.setFilteredList.bind(this);
    }

    async componentDidMount() {
        await this.props.getProducts();
    }

    actionOnItem(item) {
        const selectedProduct = {
            name: item.name,
            description: item.description,
            price: item.price,
            productId: item.productId,
            category: item.category,
            serviceProviderId: item.serviceProviderId,
            variantId: item.variantId,
            taxonId: item.taxonId,
            lineItemId: item.lineItemId
        };
        
        const kafkaItems = this.generateKafkaItem(selectedProduct);

        this.props.setSelectedProduct(selectedProduct);
        this.props.makeKafkaCall(kafkaItems);
        this.props.navigation.navigate('ProductDetailComponent');
    }

    generateKafkaItem(selectedProduct) {
        let date = new Date();
        const kafkaItems = {
            userId: this.props.userId,
            time: date.toISOString(),
            action: 'browse',
            productId: selectedProduct.productId,
            value: 0
        };
        return kafkaItems;
    }

    setFilteredList() {
        return this.props.productDetails
            .filter((item) => item.category === this.props.filterCategory);
    }

    setTableItems({ item }) {
        return <TouchableWithoutFeedback onPress={() => this.actionOnItem(item)}>
            <View style={styles.item}>
                <View style= {styles.placeholder}>
                    <Image source={ generateImage(this.props.filterCategory) } style={styles.image}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <TextMask style={styles.itemPrice}
                        value={item.price}
                        type={'money'}
                        options={formatting}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>;
    }

    render() {
        const filteredList = this.setFilteredList();
        return <ScrollView>
            <FlatList
                data={filteredList}
                keyExtractor={(item, index) => index.toString()}
                style={styles.view}
                renderItem={this.setTableItems}
                numColumns={numColumns} />
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexGrow: 1
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
        justifyContent: 'space-between',
        flex: 1,
        margin: 1,
        height: 300
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    itemDescription: {
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10
    },
    itemPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10
    }
});

ProductListComponent.propTypes = {
    productDetails: PropTypes.array,
    getProducts: PropTypes.func,
    setSelectedProduct: PropTypes.func,
    makeKafkaCall: PropTypes.func,
    filterCategory: PropTypes.string,
    userId: PropTypes.number,
    navigation: PropTypes.shape({
        navigate: PropTypes.func
    })
};

export default ProductListComponent;