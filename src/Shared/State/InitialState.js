import { RegistrationSteps } from '../../Components/Register/RegisterConstants';

const InitialState = {
    registrationState: {
        currentStep: RegistrationSteps.ContactDetails,
        contactDetailState: {
            cellNo: null,
            password: null,
            email: null
        },
        verifyOTPState: {
            requesting: false,
            verifying: false,
            otp: null,
            requestError: null,
            verificationError: null
        },
        identityInformationState: {
            id: null,
            name: null,
            confirmDetails: false,
            submitting: false,
            submitError: null
        } 
    },
    balanceRequestState: {
        balance: null,
        requestError: null,
        requesting: false,
        walletId: null
    }, 
    walletToWalletState: {
        userInfo: {
            userId: null,
            email: null,
            amount: null,
            openScanner: false,
            firstName: null,
            surname: null,
            middleName: null,
            error: null,
            walletId: null
        },
        paymentInfo: {
            amount: null,
            description: null,
            paying: false,
            paymentError: null
        }
    },
    loginState: {
        email: null,
        userId: null,
        userInfo: null,
        password: null,
        error: null,
        loading: false,
        loadingUserInfo: false,
        loadingUserInfoError: null,
        jwt: null,
        username: null,
        loggedIn: false,
        spreeJwt: null
    },
    walletUploadState: {
        amountToAdd: 0,
        loading: false,
        walletBalanceState: {
            verifying: null,
            verificationError: null,
            balance: 0,
            walletId: null
        },
        cardInfoState: {
            cardNumber: null,
            expiry: null,
            cvv: null
        },
        walletTopUpState: {
            verifying: null,
            verificationError: null
        }
    },
    purchaseSummaryState: {
        productId: null,
        quantity: 1,
        total: 0
    },
    productState: {
        filterCategory: null,
        productAPICallState: {
            requesting: false,
            requestError: null
        },
        productDetailState: [],
        selectedProductDetailState: {
            name: null,
            description: null,
            price: 0,
            serviceProviderId: null,
            productId: null,
            category: null,
            currency: null,
            variantId: null,
            taxonId: null,
            lineItemId: null,
            message: false,
        }
    },
    cartState: {
        cart: [],
        total: 0,
        itemsTotal: 0,
        fetching: false,
        fetchingError: null,
        clearing: false,
        clearingError: null,
        clearedCartInfo: null,
        updatedQuantity: 0,
        adding: false,
        removing: false,
        updating: false,

        addingError: null,
        removingError: null,
        updatingError: null
    },
    paymentOptionsState: {
        paymentMode: null,
        processing: false,
        processingError: null,
        saleData: null,
        orderNumber: null
    },
    orderHistoryState: {
        orderHistory: [],
        index: null,
        orderAPICallState: {
            verifying: false,
            verificationError: null
        }
    } 
};

export default InitialState;