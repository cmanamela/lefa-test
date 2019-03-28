import * as API from './API';
import sinon from 'sinon';
import * as Config from '../Config';

describe('API', () => {
    describe('Integration Tests', () => {
        describe.skip('requestOTP', () => {
            it('Should Send the number an OTP', async () => {
                const testNumber = '0788114749';
                await API.requestOTP(testNumber);
            });      
        });

        describe.skip('validateOTP', () => {
            it('Should Validate OTP', async () => {
                const testNumber = '0088223422';
                const otp = '111111';
                await API.validateOTP(testNumber,otp);
            });      
        });

        describe.skip('jiniGuru_registerNewUser', () => {
            it('Should Register New User', async () => {
                const preferences = [ { att: 'likesBeer',val: 'true' } ];
                const userIdentities = [ {
                    identity: 'gtaylor3',
                    identityType: 'username',
                    password: 'mypassword' } ];
                const newUserDetails = {
                    firstName: 'Gareth',
                    middleName: 'Warren',
                    lastName: 'Taylor',
                    email1: 'test@test.com',
                    phone1: '0788114749',
                    gender: 'M',
                    nationalIdentityNumber: '1111111111111',
                    verificationCodes: '111111',
                    preferences: preferences,
                    other: 'whatever you want',
                    userIdentities: userIdentities
                };
                await API.jiniGuru_registerNewUser(newUserDetails);
            });      
        });

        describe.skip('jiniGuru_userLogin', () => {
            it('Should Login the User', async () => {
                const userLoginDetails = {
                    identity: 'jacksoap',
                    password: 'mypassword'
                };
                await API.jiniGuru_userLogin(userLoginDetails);
            });      
        });
        
        describe.skip('getUserByID', () => {
            it('Should Get User by ID', async () => {
                const userID = '1';
                const jwt = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrc29hcCIsInVpZCI6MSwiY2giOiJZclJWSUdMbTVRIiwicm9sZXMiOiIiLCJpc3MiOiJodHRwOlwvXC9qaW5pLmd1cnUiLCJleHAiOjE1NTQ1MzkyMDZ9.nIadvzD_EsPI-toowhqfjjU6nczmXOFO5aFpUBdsw0k';
                await API.getUserByID(userID,jwt);
            });      
        });
        
        describe.skip('getUserByUsername', () => {
            it('Should Get User by username', async () => {
                const username = { offset: '0',
                    limit: '50',
                    identity: 'jacksoap' };
                const jwt = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrc29hcCIsInVpZCI6MSwiY2giOiJZclJWSUdMbTVRIiwicm9sZXMiOiIiLCJpc3MiOiJodHRwOlwvXC9qaW5pLmd1cnUiLCJleHAiOjE1NTQ1MzkyMDZ9.nIadvzD_EsPI-toowhqfjjU6nczmXOFO5aFpUBdsw0k';
                await API.getUserByUsername(username,jwt);
            });      
        });
        
        describe.skip('jiniGuru_getProductList', () => {
            it('Should Get Jini Guru Product List for User', async () => {
                const vendorParams = { serviceProviderId: '1',
                    match: '1' };
                const jwt = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrc29hcCIsInVpZCI6MSwiY2giOiJZclJWSUdMbTVRIiwicm9sZXMiOiIiLCJpc3MiOiJodHRwOlwvXC9qaW5pLmd1cnUiLCJleHAiOjE1NTQ1MzkyMDZ9.nIadvzD_EsPI-toowhqfjjU6nczmXOFO5aFpUBdsw0k';
                await API.jiniGuru_getProductList(vendorParams,jwt);
            });      
        });

        describe.skip('spree_getProductList', () => {
            it('Should Get Spree Product List for User', async () => {
                await API.spree_getProductList();
            });      
        });

        describe.skip('spree_getCompletedOrders', () =>{
            it('Should return the Order History from Spree', async () => {
                const jwt = 'Bearer f825839075b3c120375815c3ee0026c711c21b97e36a5fea68bf2e836d516030';
                await API.spree_getCompletedOrders(jwt);
            });
        });

        describe.skip('getSpecficProduct', () => {
            const productID = 1;
            it('Should return the Specific Product', async () => {
                await API.getSpecificProduct(productID);
            });
        });

        describe.skip('getTaxonList', () => {
            it('Should Get Taxon List for User', async () => {
                await API.spree_getTaxonsList();
            });      
        });

        describe.skip('getSpecficTaxon', () => {
            const taxonID = 15;
            it('Should return the Specific Product', async () => {
                await API.spree_getSpecificTaxon(taxonID);
            });
        });
        
        describe.skip('getUsersWallet', () => {
            it('Should return the Users Wallet Details', async () => {
                const userID = 1;
                const jwt = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrc29hcCIsInVpZCI6MSwiY2giOiJZclJWSUdMbTVRIiwicm9sZXMiOiIiLCJpc3MiOiJodHRwOlwvXC9qaW5pLmd1cnUiLCJleHAiOjE1NTQ1MzkyMDZ9.nIadvzD_EsPI-toowhqfjjU6nczmXOFO5aFpUBdsw0k';
                await API.getUsersWallet(userID,jwt);
            });      
        });
        
        describe.skip('getWalletHistory', () => {
            it('Should Get the Wallets History', async () => {
                const walletId = '1';
                const jwt = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrc29hcCIsInVpZCI6MSwiY2giOiJZclJWSUdMbTVRIiwicm9sZXMiOiIiLCJpc3MiOiJodHRwOlwvXC9qaW5pLmd1cnUiLCJleHAiOjE1NTQ1MzkyMDZ9.nIadvzD_EsPI-toowhqfjjU6nczmXOFO5aFpUBdsw0k';
                await API.getWalletHistory(walletId,jwt);
            });      
        });
        
        describe.skip('getUserAccountDetails', () => {
            it('Should return the Users Account Details', async () => {
                const userID = 1;
                const jwt = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrc29hcCIsInVpZCI6MSwiY2giOiJZclJWSUdMbTVRIiwicm9sZXMiOiIiLCJpc3MiOiJodHRwOlwvXC9qaW5pLmd1cnUiLCJleHAiOjE1NTQ1MzkyMDZ9.nIadvzD_EsPI-toowhqfjjU6nczmXOFO5aFpUBdsw0k';
                await API.getUserAccountDetails(userID,jwt);
            });      
        });
        
        describe.skip('walletToWalletTransfer', () => {
            it('Should Transfer a money from one Wallet to another', async () => {
                const uuidv4 = require('uuid/v4');
                const transactionDetails = { fromWalletFriendlyId: 'user-1',
                    toWalletFriendlyId: 'user-5',
                    amount: '10',
                    description: 'For bread and milk',
                    currency: 'ZAR',
                    uniqueId: uuidv4() };
                const jwt = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrc29hcCIsInVpZCI6MSwiY2giOiJZclJWSUdMbTVRIiwicm9sZXMiOiIiLCJpc3MiOiJodHRwOlwvXC9qaW5pLmd1cnUiLCJleHAiOjE1NTQ1MzkyMDZ9.nIadvzD_EsPI-toowhqfjjU6nczmXOFO5aFpUBdsw0k';
                
                await API.walletToWalletTransfer(transactionDetails,jwt);
            });      
        });  

        describe.skip('jiniGuru_createSale', () => {
            it('Should Create a Jini Guru Sale', async () => {                
                const uuidv4 = require('uuid/v4');
                const walletId = '1';

                const saleLines = [ { productId: '1',
                    quantity: '1' } ];
                const paymentSettings = { createToken: true,
                    unattended: true,
                    useTokenIfAvailable: true };
                const firstEvent = { event: 'QUOTE_ACCEPTED' };
                const jwt = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrc29hcCIsInVpZCI6MSwiY2giOiJ1cHBrZkR5aWpxIiwicm9sZXMiOiIiLCJpc3MiOiJodHRwOlwvXC9qaW5pLmd1cnUiLCJleHAiOjE1NTU2NzgxMTJ9.siiNOsG3PHDIy5w2QYyeDOCWlyFVcWQurXvHRre2CD4';
                const saleDetails = { uniqueId: uuidv4(),
                    currency: 'ZAR',
                    serviceProviderId: '1',
                    paymentMechanism: 'Card',
                    saleLines: saleLines,
                    paymentSettings: paymentSettings,
                    firstEvent: firstEvent };

                const result = await API.jiniGuru_createSale(walletId,saleDetails,jwt);
                
                expect(result.data).toHaveProperty('saleId');
                expect(result.data).toBeDefined();
            });      
        });    

        describe.skip('walletTopUpViaSale', () => {
            it('Should Add Funds to a Wallet Via a Sale Payment', async () => {
                const uuidv4 = require('uuid/v4');
                const walletId = '1';

                const saleLines = [ { productId: '1',
                    quantity: '1',
                    fulfilmentData: '2' } ];
                const paymentSettings = { createToken: true,
                    unattended: true,
                    useTokenIfAvailable: true };
                const firstEvent = { event: 'QUOTE_ACCEPTED' };

                const saleDetails = { uniqueId: uuidv4(),
                    currency: 'ZAR',
                    serviceProviderId: '1',
                    paymentMechanism: 'Card',
                    saleLines: saleLines,
                    paymentSettings: paymentSettings,
                    firstEvent: firstEvent };
                    
                const jwt = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrc29hcCIsInVpZCI6MSwiY2giOiJZclJWSUdMbTVRIiwicm9sZXMiOiIiLCJpc3MiOiJodHRwOlwvXC9qaW5pLmd1cnUiLCJleHAiOjE1NTQ1MzkyMDZ9.nIadvzD_EsPI-toowhqfjjU6nczmXOFO5aFpUBdsw0k';
                
                await API.walletTopUpViaSale(walletId,saleDetails,jwt);
            });      
        });

        describe.skip('spree_createCart', () => {
            it('Should create a cart', async () => {
                const jwt = 'Bearer f825839075b3c120375815c3ee0026c711c21b97e36a5fea68bf2e836d516030';
                const response = await API.spree_createCart(jwt);
                const responseData = response.data.data;

                expect(responseData).toEqual(expect.objectContaining({ type: 'cart' }));
            });            
        });

        describe.skip('spree_getCart', () => {
            it('Should fetch the user\'s cart\'s details', async () => {
                const jwt = 'Bearer f825839075b3c120375815c3ee0026c711c21b97e36a5fea68bf2e836d516030';
                const response = await API.spree_getCart(jwt);
                const responseData = response.data.data;
                const responseIncludes = response.data.included;

                expect(responseData).toEqual(expect.objectContaining({ type: 'cart' }));
                expect(responseIncludes).toBeDefined();
                expect(responseIncludes).toEqual(expect.arrayContaining([ expect.objectContaining({ type: 'line_item' }) ]));
            });            
        });

        describe.skip('spree_addItemToCart', () => {
            it('Should add an item to the user\'s cart', async () => {
                const jwt = 'Bearer f825839075b3c120375815c3ee0026c711c21b97e36a5fea68bf2e836d516030';
                const variantId = '55';
                const quantity = 3;
                const response = await API.spree_addItemToCart(variantId, quantity, jwt);
                const responseData = response.data.data;
                const responseIncludes = response.data.included;

                expect(responseData).toEqual(expect.objectContaining({ type: 'cart' }));
                expect(responseIncludes).toBeDefined();
                expect(responseIncludes).toEqual(expect.arrayContaining([ expect.objectContaining({ type: 'line_item' }) ]));
            });
        });

        describe.skip('spree_removeItemFromCart', () => {
            it('Should remove an item from the user\'s cart', async () => {
                const jwt = 'Bearer f825839075b3c120375815c3ee0026c711c21b97e36a5fea68bf2e836d516030';
                const lineItemId = '5';
                const response = await API.spree_removeItemFromCart(lineItemId, jwt);
                const responseData = response.data.data;
                const responseIncludes = response.data.included;

                expect(responseData).toEqual(expect.objectContaining({ type: 'cart' }));
                expect(responseIncludes).toBeDefined();
                expect(responseIncludes).toEqual(expect.arrayContaining([ expect.objectContaining({ type: 'line_item' }) ]));
            });
        });
        
        describe.skip('spree_changeCartItemQuantity', () => {
            it('Should change an item quantity in the user\'s cart', async () => {
                const jwt = 'Bearer f825839075b3c120375815c3ee0026c711c21b97e36a5fea68bf2e836d516030';
                const lineItemId = '6';
                const quantity = 1;
                const response = await API.spree_changeCartItemQuantity(lineItemId, quantity, jwt);
                const responseData = response.data.data;
                const responseIncludes = response.data.included;

                expect(responseData).toEqual(expect.objectContaining({ type: 'cart' }));
                expect(responseIncludes).toBeDefined();
                expect(responseIncludes).toEqual(expect.arrayContaining([ expect.objectContaining({ 
                    type: 'line_item', 
                    attributes: expect.objectContaining({
                        quantity
                    }) 
                }) ]));
            });
        });
        
        describe.skip('spree_clearCart', () => {
            it('Should clear the user\'s cart', async () => {
                const jwt = 'Bearer f825839075b3c120375815c3ee0026c711c21b97e36a5fea68bf2e836d516030';
                const response = await API.spree_clearCart(jwt);
                const responseData = response.data.data;

                expect(responseData).toEqual(expect.objectContaining({ 
                    type: 'cart', 
                    attributes: expect.objectContaining({
                        item_count: 0
                    }) }));
            });
        });

        describe('spree_orderUpdate', () => {
            it('Should update order info', async () => {
                const jwt = 'Bearer f825839075b3c120375815c3ee0026c711c21b97e36a5fea68bf2e836d516030';
                const orderInfo = {
                    'email': 'jacksoap@jacksoap.com',
                    'bill_address_attributes': {
                        'firstname': 'jack',
                        'lastname': 'soap',
                        'address1': '22 test st',
                        'address2': '',
                        'city': 'johannesburg',
                        'phone': '0788445569',
                        'zipcode': '2541',
                        'state_name': 'Gauteng',
                        'country_iso': 'ZAF'
                    },
                    'ship_address_attributes': {
                        'firstname': 'jack',
                        'lastname': 'soap',
                        'address1': '22 test st',
                        'address2': '',
                        'city': 'johannesburg',
                        'phone': '0788445569',
                        'zipcode': '2541',
                        'state_name': 'Gauteng',
                        'country_iso': 'ZAF'
                    },
                    'payments_attributes': [
                        {
                            'payment_method_id': '4'
                        }
                    ],
                    'shipments_attributes': {}
                };
                const paymentSource = { 'payment_source': {} };                
                
                const response = await API.spree_orderUpdate(orderInfo,paymentSource,jwt);
                const responseData = response.data.data; 
                expect(responseData).toEqual(expect.objectContaining({ type: 'cart' }));
            });
        });

        describe.skip('spree_orderComplete', () => {
            it('Should set the users order to complete', async () => {
                const jwt = 'Bearer f825839075b3c120375815c3ee0026c711c21b97e36a5fea68bf2e836d516030';
                const response = await API.spree_orderComplete(jwt);
                const responseData = response.data.data;

                expect(responseData).toEqual(expect.objectContaining({ type: 'cart' }));
            });            
        });

        describe.skip('mapSpreeResponse_orderComplete', () => {
            it('Should return a re-mapped object', () => {
                const unMappedObj = {
                    data: {
                        'data': {
                            'id': '1',
                            'type': 'cart',
                            'attributes': {
                                'number': 'R123456789',
                                'email': 'spree@example.com',
                                'item_total': '19.99',
                                'display_item_total': '$19.99',
                                'total': '29.99'
                            },
                            'relationships': {}
                        }
                    }
                };
                const result = API.mapSpreeResponse_orderComplete(unMappedObj);
                
                expect(result.data).toHaveProperty('saleId');
                expect(result.data).toBeDefined();
            });            
        });

        describe.skip('spree_userLogin', () => {
            it('Should Login the User if their details are correct', async () => {
                const userLoginDetails = {
                    identity: 'test@test.com',
                    password: 'password'
                };
                const response = await API.spree_userLogin(userLoginDetails);
                expect(response.data).toHaveProperty('access_token');
            });

            it('Should throw an exception if login details are incorrect', async () => {
                const userLoginDetails = {
                    identity: 'test@test.com',
                    password: 'incorrectpassword'
                };
                try {
                    expect(await API.spree_userLogin(userLoginDetails)).rejects.toThrow();
                } catch (e) {
                    expect(e).toHaveProperty('message');
                }
            });
        });

        describe.skip('mapSpreeResponse_userLogin', () => {
            it('Should return an object in the expected format', () => {
                const spreeResponse = {
                    data: {
                        access_token: 'testtoken'
                    }
                };

                const expected = {
                    spreeHeaderValue: 'Bearer testtoken'
                };

                const actual = API.mapSpreeResponse_userLogin(spreeResponse);
                expect(actual).toMatchObject(expected);
            });
        });

        describe.skip('userLogin', () => {
            describe('login details are correct', () => {
                it('Should return both headerValue and spreeHeaderValue if the platform is spree', async () => {
                    const platformCheckMock = sinon.stub(Config, 'platformIsSpree');
                    platformCheckMock.returns(true);
                    
                    const userLoginDetails = {
                        identity: 'test@test.com',
                        password: 'password'
                    };

                    const response = await API.userLogin(userLoginDetails);
                    
                    expect(response.data).toHaveProperty('headerValue');
                    expect(response.data).toHaveProperty('spreeHeaderValue');

                    platformCheckMock.restore();
                });
            });

            describe('login details are incorrect', () => {
                const userLoginDetails = {
                    identity: 'test@test.com',
                    password: 'incorrectpassword'
                };
                it('Should throw if the platform is jini guru', async () => {
                    const platformCheckMock = sinon.stub(Config, 'platformIsSpree');
                    platformCheckMock.returns(false);

                    try {
                        expect(await API.userLogin(userLoginDetails)).rejects.toThrow();
                    } catch (e) {
                        expect(e).toHaveProperty('message');
                    } finally {
                        platformCheckMock.restore();
                    }
                });
                
                it('Should throw if the platform is spree', async () => {
                    const platformCheckMock = sinon.stub(Config, 'platformIsSpree');
                    platformCheckMock.returns(true);

                    try {
                        expect(await API.userLogin(userLoginDetails)).rejects.toThrow();
                    } catch (e) {
                        expect(e).toHaveProperty('message');
                    } finally {
                        platformCheckMock.restore();
                    }
                });
            });
        });

        describe.skip('spree_registerNewUser', () => {
            it('Should register a user if a valid email is provided', async () => {
                const newUserDetails = {
                    userIdentities: [ {
                        identity: 'test1@test1.com',
                        password: 'password'
                    } ]
                };

                await API.spree_registerNewUser(newUserDetails);
            });
        });

        describe.skip('registerNewUser', () => {
            describe('invalid login details', () => {
                const newUserDetails = {
                    userIdentities: [ {
                        identity: 'notanemail',
                        password: 'password'
                    } ]
                };
                
                it('Should not call jiniGuru registration if the platform is spree', async () => {
                    const jiniGuruRegistrationMock = sinon.stub(API, 'jiniGuru_registerNewUser');
                    const platformCheckMock = sinon.stub(Config, 'platformIsSpree');
                    jiniGuruRegistrationMock.resolves({ data: 'dummy' });
                    platformCheckMock.returns(true);

                    try {
                        await API.registerNewUser(newUserDetails);
                    } catch {
                        sinon.assert.notCalled(jiniGuruRegistrationMock);
                    } finally {
                        jiniGuruRegistrationMock.restore();
                        platformCheckMock.restore();
                    }
                });

                it('Should throw an exception if the platform is spree', async () => {
                    const platformCheckMock = sinon.stub(Config, 'platformIsSpree');
                    platformCheckMock.returns(true);

                    try {
                        expect(await API.registerNewUser(newUserDetails)).rejects.toThrow();
                    } catch (e) {
                        const unprocessableEntityStatus = 422;
                        expect(e.response.status).toEqual(unprocessableEntityStatus);
                    } finally {
                        platformCheckMock.restore();
                    }
                });
            });
        });
    });
});