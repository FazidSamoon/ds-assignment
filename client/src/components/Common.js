import { toast } from 'react-toastify';

export const fetchError = (error) => {
    console.log(error);
    const errorMessage = error.response.data.message;
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

export const userFetchResult = (response, message) => {
    if (response.status == 200) {
        toast.success(message);

        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
    }
};
