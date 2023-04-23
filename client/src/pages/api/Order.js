import { fetchError, fetchResultNormal } from '@/components/Common';
import Axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/api/order';

export const createOrder = async (orderData, accessToken) => {
    Axios.post(`${API_BASE_URL}`, orderData, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((response) => {
            fetchResultNormal(response, 'order successfully listed');
        })
        .catch((error) => {
            fetchError(error);
        });
};

export const getOrderById = async (userId) => {
    try {
        const response = await Axios.get(`${API_BASE_URL}/${userId}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};
