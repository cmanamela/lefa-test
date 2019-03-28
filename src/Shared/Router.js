import { createStackNavigator } from 'react-navigation';
import RegisterComponent from '../Components/Register/RegisterComponent';
import LoginComponent from '../Components/Login/LoginComponent';
import HomeComponent from '../Components/Home/HomeComponent';
import LandingComponent from '../Components/Home/LandingComponent';
import QRScannerPaymentComponent from '../Components/WalletToWallet/SubViews/QRScannerPaymentComponent';
import ProductComponent from '../Components/Shop/ProductComponent';
import PurchaseSummaryComponent from '../Components/PurchaseSummary/PurchaseSummaryComponent';
import ProductDetailComponent from '../Components/Shop/ProductDetailComponent';
import PaymentOptionsComponent from '../Components/PaymentOptions/PaymentOptionsComponent';
import PayToPersonComponent from '../Components/PayToPerson/PayToPersonComponent';
import SelectAmountComponent from '../Components/MoneyToEWallet/SelectAmountComponent';
import CompletePaymentCreditComponent from '../Components/MoneyToEWallet/CompletePaymentCreditComponent';
import PaymentOptionComponent from '../Components/MoneyToEWallet/PaymentOptionComponent';
import SuccessComponent from '../Components/MoneyToEWallet/SuccessComponent';
import WalletToWalletSuccessComponent from '../Components/WalletToWallet/SubViews/WalletToWalletSuccessComponent';
import OrderConfirmedComponent from '../Components/Shop/OrderConfirmedComponent';
import PurchaseFailureComponent from '../Components/Shop/PurchaseFailureComponent';
import GeneratedQRcodeComponent from '../Components/WalletToWallet/SubViews/GeneratedQRcodeComponent';
import OrderHistoryComponent from '../Components/OrderHistory/OrderHistoryComponent';
import OrderDetailComponent from '../Components/OrderHistory/OrderDetailComponent';

const Router = createStackNavigator({	
    RegisterComponent,
    PurchaseSummaryComponent,
    SelectAmountComponent,
    CompletePaymentCreditComponent,
    PaymentOptionComponent,
    SuccessComponent,
    LoginComponent,
    HomeComponent,
    LandingComponent,
    QRScannerPaymentComponent,
    ProductComponent,
    ProductDetailComponent,
    WalletToWalletSuccessComponent,
    PaymentOptionsComponent,
    OrderConfirmedComponent,
    PayToPersonComponent,
    PurchaseFailureComponent,
    GeneratedQRcodeComponent,
    OrderHistoryComponent,
    OrderDetailComponent
}, 
{
    initialRouteName: 'HomeComponent',
    headerMode: 'screen'
});

export default Router;