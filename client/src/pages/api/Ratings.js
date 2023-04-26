import { fetchError, fetchResult } from '@/components/Common';
import Axios from 'axios';

const API_BASE_URL = 'http://localhost:3004/api/ratings';

export const addRatings = async (ratingsData, accessToken) => {
    Axios.post(`${API_BASE_URL}`, ratingsData, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((response) => {
            fetchResult(response, 'rating successfully listed');
        })
        .catch((error) => {
            fetchError(error);
        });
};
