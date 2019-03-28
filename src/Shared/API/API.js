import axios from 'axios';
import * as Config from '../Config';
import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
import { spreeAPIKeyHeaders } from './APIConstants';

const baseUrl = 'https://wakanda.test.jini.guru/wakanda-conductor/rest/v1';
const spreeBase = 'https://wakanda-commerce.herokuapp.com';
const spreeUrl = `${spreeBase}/api/v2/storefront`;
const kafkaUrl = 'https://wakandapoc.azurewebsites.net/api/event';

export const requestOTP = async (number) => {
    const url = `${baseUrl}/verifications`;
    const requestConfig = {
        method: 'POST',
        url,
        data: [ number ]
    };

    return await axios(requestConfig);
};

export const validateOTP = async (number,otp) => {
    const url = `${baseUrl}/verifications/${number}`;
    const requestConfig = {
        method: 'GET',
        url,
        params: { code: otp }
    };
    
    return await axios(requestConfig);
};

export const jiniGuru_registerNewUser = async(newUserDetails) =>{
    const url = `${baseUrl}/users`;
    const requestConfig = {
        method: 'POST',
        url,
        data: newUserDetails
    };

    return await axios(requestConfig);
};

export const jiniGuru_userLogin = async(userLoginDetails) =>{
    const url = `${baseUrl}/login`;
    const requestConfig = {
        method: 'POST',
        url,
        data: userLoginDetails
    };

    return await axios(requestConfig);
};

export const getUserByID = async (userID, jwt) => {
    const url = `${baseUrl}/users/${userID}`;
    const requestConfig = {
        method: 'GET',
        url,
        headers: { 'Authorization': jwt }
    };

    return await axios(requestConfig);
};

export const getUserByUsername = async (username, jwt) => {
    const url = `${baseUrl}/users`;
    const requestConfig = {
        method: 'GET',
        url,
        params: username,
        headers: { 'Authorization': jwt }
    };

    return await axios(requestConfig);
};

export const getProductList = async (vendorParams, jwt) => {
    if (Config.platformIsSpree()) {
        const productResponse = await spree_getProductList();
        const taxonsResponse = await spree_getTaxonsList();
        return mapSpreeResponse_productList(productResponse, taxonsResponse.data.data);
    } else {
        const productResponse = await jiniGuru_getProductList(vendorParams, jwt);
        return mapJiniGuruResponse_productList(productResponse.data);
    }
};

export const mapSpreeResponse_productList = async (productResponse, taxonsResponse) => {
    const productData = productResponse.data.data;
    const firstIndex = 0;
    return await productData.map(product => ({
        id: product.id,
        name: product.attributes.name,
        description: product.attributes.description,
        price: parseFloat(product.attributes.price),
        serviceProviderId: product.attributes.meta_description,
        currency: product.attributes.currency,
        variantId: product.relationships.default_variant.data.id,
        taxonId: product.relationships.taxons.data[firstIndex].id,
        category: taxonsResponse.find((taxon)=> taxon.id === product.relationships.taxons.data[firstIndex].id).attributes.name
    }));
};

export const mapJiniGuruResponse_productList = (productResponse) => {
    return productResponse.map(product => ({
        id: product.productId,
        name: product.name,
        description: product.description,
        price: product.unitPriceExcl,
        serviceProviderId: product.serviceProviderId,
        currency: product.currency,
        variantId: null,
        taxonId: null,
        category: product.category
    }));
};

export const jiniGuru_getProductList = async (vendorParams, jwt) => {
    const url = `${baseUrl}/products`;
    const requestConfig = {
        method: 'GET',
        url,
        params: vendorParams,
        headers: { 'Authorization': jwt }
    };
    return await axios(requestConfig);
};

export const spree_getProductList = async () => {
    const url = `${spreeUrl}/products`;
    const requestConfig = {
        method: 'GET',
        url
    };
    return await axios(requestConfig);
};

export const getUsersWallet = async (userID, jwt) => {
    const url = `${baseUrl}/wallets`;
    const requestConfig = {
        method: 'GET',
        url,
        params: { userId: userID },
        headers: { 'Authorization': jwt }
    };
    return await axios(requestConfig);
};

export const getWalletHistory = async (walletId, jwt) => {
    const url = `${baseUrl}//wallets/${walletId}/history`;
    const requestConfig = {
        method: 'GET',
        url,
        headers: { 'Authorization': jwt }
    }; 
    return await axios(requestConfig);
};

export const getUserAccountDetails = async (userID, jwt) => {
    const url = `${baseUrl}/accounts`;
    const requestConfig = {
        method: 'GET',
        url,
        params: { userId: userID },
        headers: { 'Authorization': jwt }
    };

    return await axios(requestConfig);
};

export const walletToWalletTransfer = async(transactionDetails,jwt) =>{
    const url = `${baseUrl}/wallets/transfers`;
    const requestConfig = {
        method: 'POST',
        url,
        data: transactionDetails,
        headers: { 'Authorization': jwt }
    };

    return await axios(requestConfig);
};

export const spree_orderUpdate = async (orderInfo, paymentSource, jwt) => {
   
    const url = `${spreeUrl}/checkout`;
    const requestConfig = {
        method: 'PATCH',
        url,
        headers: {
            'Authorization': jwt, 
            'Content-Type': 'application/json'
        },
        data: {
            order: orderInfo,
            payment_source: paymentSource
        }
    };
    return await axios(requestConfig);
};

export const spree_orderComplete = async (jwt) => {
    const url = `${spreeUrl}/checkout/complete`;
    const requestConfig = {
        method: 'PATCH',
        url,
        headers: {
            'Authorization': jwt
        }
    }; 
    return await axios(requestConfig);
};

export const mapSpreeResponse_orderComplete = (spreeResponse) => {
    return { data: {
        saleId: `${spreeResponse.data.data.attributes.number}` }
    };
};

export const jiniGuru_createSale = async(walletId, saleDetails, jwt) =>{ 
    const url = `${baseUrl}/accounts/${walletId}/sales`;
    const requestConfig = {
        method: 'POST',
        url,
        data: saleDetails,
        headers: { 'Authorization': jwt }
    };
    const result = await axios(requestConfig); 
    return result;
};

export const createSale = async(walletId, saleDetails, paymentSource, jwt) =>{
    if (Config.platformIsSpree()) {
        await spree_orderUpdate(saleDetails, paymentSource, jwt);  
        const orderCompleteResponse = await spree_orderComplete(jwt); 
        return mapSpreeResponse_orderComplete(orderCompleteResponse);
    } else { 
        return await jiniGuru_createSale(walletId, saleDetails, jwt); 
    }    
};

export const walletTopUpViaSale = async(walletId,saleDetails,jwt) =>{
    const url = `${baseUrl}/accounts/${walletId}/sales`;
    const requestConfig = {
        method: 'POST',
        url,
        data: saleDetails,
        headers: { 'Authorization': jwt }
    };
    
    return await axios(requestConfig);
};

export const kafkaLogProductEvents = (kafkaInfo) =>{
    const requestConfig = {
        method: 'POST',
        kafkaUrl,
        data: { type: 'event',
            source: `//android/react-native/${kafkaInfo.userId}`,
            time: kafkaInfo.time,
            category: 'product',
            action: kafkaInfo.action,
            label: `://products/productid:${kafkaInfo.productId}`,
            value: kafkaInfo.value
        }
    };
    axios(requestConfig);
    try {
        const dataSet = {
            'platform': Platform.OS,
            'source': `//${Platform.OS}/react-native/${kafkaInfo.userId}`,
            'userId': kafkaInfo.userId,
            'productId': kafkaInfo.productId,
            'action': kafkaInfo.action,
            'time': kafkaInfo.time,
            'category': 'product'
        };
        firebase.analytics().logEvent('ProductLog', dataSet);
    } catch (error) {
        console.log(error); // eslint-disable-line
    }
};

export const spree_createCart = async (jwt) => {
    const url = `${spreeUrl}/cart`;
    const requestConfig = {
        method: 'POST',
        url,
        headers: {
            Authorization: jwt
        }
    };

    return await axios(requestConfig);
};

export const spree_getCart = async (jwt) => {
    const url = `${spreeUrl}/cart`;
    const requestConfig = {
        method: 'GET',
        url,
        headers: {
            Authorization: jwt
        },
        params: {
            include: 'line_items'
        }
    };

    return await axios(requestConfig);
};

export const addToCart = async (product) => {
    if ( Config.platformIsSpree() ){
        await spree_createCart(product.jwt);
        const response = await spree_addItemToCart(product.variantId,product.quantity,product.jwt);
        return { data: response };
    } else {
        const response = product;
        return { data: response };
    }
};
export const spree_addItemToCart = async (variantId, quantity, jwt) => {
    const url = `${spreeUrl}/cart/add_item`;
    const requestConfig = {
        method: 'POST',
        url,
        headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json'
        },
        data: {
            variant_id: variantId,
            quantity
        },
        params: {
            include: 'line_items'
        }
    };

    return await axios(requestConfig);
};

export const removeItemFromCart = async (product) => {
    if ( Config.platformIsSpree() ){
        const response = await spree_removeItemFromCart(product.lineItemId,product.jwt);
        return { data: response };
    } else {
        return { data: product };
    }
};
export const spree_removeItemFromCart = async (lineItemId, jwt) => {
    const url = `${spreeUrl}/cart/remove_line_item/${lineItemId}`;
    const requestConfig = {
        method: 'DELETE',
        url,
        headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json'
        },
        params: {
            include: 'line_items'
        }
    };

    return await axios(requestConfig);
};

export const changeItemInCart = async (product, spreeJwt) => {
    if ( Config.platformIsSpree() ){
        const response = await spree_changeCartItemQuantity(product.lineItemId,product.quantity,spreeJwt);
        return { data: response };
    } else {
        return { data: product };
    }
};
export const spree_changeCartItemQuantity = async (lineItemId, quantity, jwt) => {
    const url = `${spreeUrl}/cart/set_quantity`;
    const requestConfig = {
        method: 'PATCH',
        url,
        headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json'
        },
        data: {
            line_item_id: lineItemId,
            quantity
        },
        params: {
            include: 'line_items'
        }
    };

    return await axios(requestConfig);
};

export const spree_clearCart = async (jwt) => {
    const url = `${spreeUrl}/cart/empty`;
    const requestConfig = {
        method: 'PATCH',
        url,
        headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json'
        },
        params: {
            include: 'line_items'
        }
    };

    return await axios(requestConfig);
};

export const spree_getSpecificProduct = async (productId) => {
    const url = `${spreeUrl}/products/${productId}`;
    const requestConfig = {
        method: 'GET',
        url 
    };
    return await axios(requestConfig);
};

export const spree_getTaxonsList = async () => {
    const url = `${spreeUrl}/taxons`;
    const requestConfig = {
        method: 'GET',
        url
    };
    return await axios(requestConfig);
};

export const spree_getSpecificTaxon = async (taxonId) => {
    const url = `${spreeUrl}/taxons/${taxonId}`;
    const requestConfig = {
        method: 'GET',
        url
    };
    return await axios(requestConfig);
};

export const spree_getCompletedOrders = async (jwt) => {
    const url = `${spreeUrl}/account/orders`;
    const requestConfig = {
        method: 'GET',
        url,
        headers: {
            Authorization: jwt
        },
        params: {
            include: 'line_items'
        }
    };
    const historyResponse = await axios(requestConfig);
    return mapSpreeResponse_historyList(historyResponse);
};

export const mapSpreeResponse_historyList = async (historyResponse) => {
    const historyData = historyResponse.data.data;
    const historyInclude = historyResponse.data.included;
    return await historyData.map(history => ({
        id: history.id,
        number: history.attributes.number,
        price: history.attributes.display_total,
        created_at: history.attributes.created_at,
        completed_at: history.attributes.completed_at,
        state: history.attributes.state,
        intstructions: history.attributes.special_instructions,
        line_items: history.relationships.line_items.data.map(item =>({
            ...historyInclude.find(includedItem => includedItem.id === item.id).attributes
        }))
    }));
};

export const spree_userLogin = async ({ identity, password }) => {
    const url = `${spreeBase}/spree_oauth/token`;
    const requestConfig = {
        method: 'POST',
        url,
        data: {
            username: identity,
            password,
            grant_type: 'password'
        }
    };

    return await axios(requestConfig);
};

export const mapSpreeResponse_userLogin = (spreeResponse) => {
    return {
        spreeHeaderValue: `Bearer ${spreeResponse.data.access_token}`
    };
};

export const userLogin = async (userLoginDetails) => {
    const response = await jiniGuru_userLogin(userLoginDetails);

    if (Config.platformIsSpree()) {
        const spreeResponse = await spree_userLogin(userLoginDetails);
        response.data = {
            ...response.data,
            ...mapSpreeResponse_userLogin(spreeResponse)
        };
    }

    return response;
};

export const spree_registerNewUser = async ({ userIdentities }) => {
    const firstIndex = 0;
    const { identity, password } = userIdentities[firstIndex];
    const registrationDetails = {
        user: {
            email: identity,
            password
        }
    };

    const url = `${spreeBase}/api/v1/users`;
    const requestConfig = {
        method: 'POST',
        url,
        data: registrationDetails,
        headers: {
            ...spreeAPIKeyHeaders
        }
    };

    return await axios(requestConfig);
};

export const registerNewUser = async (newUserDetails) => {
    const response = {
        data: {}
    };

    if (Config.platformIsSpree()) {
        const spreeResponse = await spree_registerNewUser(newUserDetails);
        response.data = {
            ...spreeResponse.data
        };
    }

    const jiniResponse = await jiniGuru_registerNewUser(newUserDetails);
    response.data = {
        ...response.data,
        ...jiniResponse.data
    };

    return response;
};