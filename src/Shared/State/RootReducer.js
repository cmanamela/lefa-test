import { combineReducers } from 'redux';
import RegistrationReducer from '../../Components/Register/RegisterReducer';
import BalanceReducer from '../../Components/Home/BalanceReducer';
import WalletToWalletReducer from '../../Components/WalletToWallet/WalletToWalletReducer';
import LoginReducer from '../../Components/Login/LoginReducer';
import WalletUploadReducer from '../../Components/MoneyToEWallet/WalletUploadReducer';
import ProductReducer from '../../Components/Shop/ProductReducer';
import purchaseSummaryReducer from '../../Components/PurchaseSummary/PurchaseSummaryReducer';
import paymentOptionsReducer from '../../Components/PaymentOptions/PaymentOptionsReducer';
import ShoppingCartReducer from '../../Components/ShoppingCart/ShoppingCartReducer';
import OrderHistoryReducer from '../../Components/OrderHistory/OrderHistoryReducer';

const RootReducer = combineReducers({
    registrationState: RegistrationReducer,
    balanceRequestState: BalanceReducer,
    walletToWalletState: WalletToWalletReducer,
    loginState: LoginReducer,
    walletUploadState: WalletUploadReducer,
    productState: ProductReducer,
    purchaseSummaryState: purchaseSummaryReducer,
    paymentOptionsState: paymentOptionsReducer,
    cartState: ShoppingCartReducer,
    orderHistoryState: OrderHistoryReducer
});

export default RootReducer;