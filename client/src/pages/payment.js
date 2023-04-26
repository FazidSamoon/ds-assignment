import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import { createOrder } from './api/Order';

export default function Payment() {
    const [shippingData, setShippingData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [accessToken, setAccessToken] = useState();
    const [isHave, setIsHave] = useState(false);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        setAccessToken(JSON.parse(localStorage.getItem('access_token')));
        setUserData(JSON.parse(localStorage.getItem('user_data')));
        setCartData(JSON.parse(localStorage.getItem('cart_data')));
        setShippingData(JSON.parse(localStorage.getItem('shipping_data')));
    }, []);

    useEffect(() => {
        if (shippingData && cartData && userData && accessToken) {
            setIsHave(true);
        }
    }, [cartData, shippingData, accessToken, userData]);

    useEffect(() => {
        let total = 0;
        if (cartData) {
            cartData.forEach((product) => {
                total += product.price * product.quantity;
            });
        }

        if (isHave) {
            let orderObject = [
                {
                    userID: userData._id,
                    // sellerID: [],
                    // sellerID: cartData[0].sellerID,
                    products: [],
                    amount: total,
                    address: shippingData
                }
            ];
            for (let i = 0; i < cartData.length; i++) {
                // orderObject[0].sellerID.push({ sellerID: cartData[i].sellerID });
                orderObject[0].products.push({
                    productID: cartData[i]._id,
                    quantity: cartData[i].quantity
                });
            }
            setOrderData(orderObject);
        }
    }, [cartData, isHave, shippingData, userData]);

    const doPay = () => {
        createOrder(orderData[0], accessToken);
        localStorage.removeItem('cart_data');
    };

    return (
        <Layout title="Payment Page">
            <button className="btn-primary flex m-auto" onClick={() => doPay()}>
                Do Payment
            </button>
        </Layout>
    );
}
