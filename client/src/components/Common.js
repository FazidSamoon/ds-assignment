import { toast } from 'react-toastify';

export const fetchError = (error) => {
    console.log(error);
    const errorMessage = error.response?.data.message;
    if (errorMessage != null) toast.error(errorMessage);

    toast.error('connection error try again');
};

export const fetchResult = (response, message) => {
    if (response.status == 200) {
        toast.success(message);
    }
    setTimeout(() => {
        window.location.reload();
    }, 2000);
};

export const fetchResultNormal = (response, message) => {
    if (response.status == 200) {
        toast.success(message);
    }
};

export const userFetchResult = (response, message) => {
    if (response.status == 200) {
        toast.success(message);

        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
    }
};

export const userLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('cart_data');
    localStorage.removeItem('shipping_data');
};

export const addToCart = (response, qty) => {
    const { image, seller, ...productInfo } = response;
    productInfo.quantity = qty;
    productInfo.sellerID = response.seller._id;
    let cartData = JSON.parse(localStorage.getItem('cart_data'));

    if (cartData != null) {
        const productIndex = cartData.findIndex((item) => item._id === productInfo._id);
        if (productIndex !== -1) {
            if (cartData[productIndex].quantity !== qty) {
                cartData[productIndex].quantity = qty;
                localStorage.setItem('cart_data', JSON.stringify(cartData));
                toast.success('cart updated successfully');
            } else toast.warning('product is already in your cart!');
        } else {
            const updatedCart = [...cartData, productInfo];
            localStorage.setItem('cart_data', JSON.stringify(updatedCart));
            toast.success('Great! product added to the cart successfully');
        }
    } else {
        localStorage.setItem('cart_data', JSON.stringify([productInfo]));
        toast.success('Great! product added to the cart successfully');
    }
};
