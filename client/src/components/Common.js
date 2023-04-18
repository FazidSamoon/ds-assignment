import { toast } from 'react-toastify';

export const fetchError = (err) => {
    console.log(err);
    const errorMessage = err.response.data.message;
    if (errorMessage != null) toast.error(errorMessage);

    toast.error('CONNECTION ERROR TRY AGAIN');
};
