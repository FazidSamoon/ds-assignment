import { fetchError, fetchResult } from '@/components/Common';
import Axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/product';

export const createProduct = async (productData, accessToken) => {
    Axios.post(`${API_BASE_URL}`, productData, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((response) => {
            fetchResult(response, 'product successfully listed');
        })
        .catch((error) => {
            fetchError(error);
        });
};

export const updateProduct = async (productId, productData, accessToken) => {
    Axios.patch(`${API_BASE_URL}/${productId}`, productData, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((response) => {
            fetchResult(response, 'product updated successfully');
        })
        .catch((error) => {
            fetchError(error);
        });
};

export const deleteProduct = async (productId, accessToken) => {
    Axios.delete(`${API_BASE_URL}/${productId}`, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((response) => {
            fetchResult(response, 'product deleted successfully');
        })
        .catch((error) => {
            fetchError(error);
        });
};
