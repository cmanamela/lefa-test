import tv from '../../Components/Shop/images/tv.png';
import dress from '../../Components/Shop/images/dress.png';
import laptop from '../../Components/Shop/images/laptop.png';
import phone from '../../Components/Shop/images/phone.png';

const generateImage = (category) => {
    if (category === 'Laptops/Electronics'){
        return laptop;
    } else if (category === 'Womans Fashion') {
        return dress;
    } else if (category === 'Smart Phones') {
        return phone;
    } else if (category === 'TV/Appliances') {
        return tv;
    } else { 
        return tv ; 
    }
};

export default generateImage;