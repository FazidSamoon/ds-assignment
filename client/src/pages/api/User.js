import { fetchError, userFetchResult } from '@/components/Common';
import Axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/auth';

export const updateUser = async (userId, updatedData) => {
    Axios.patch(`${API_BASE_URL}/update/${userId}`, updatedData)
        .then((response) => {
            userFetchResult(response, 'updated successfully');
        })
        .catch((error) => {
            fetchError(error);
        });
};
