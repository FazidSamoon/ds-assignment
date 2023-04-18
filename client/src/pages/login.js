import Layout from '@/components/Layout';
import Axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

export default function Login() {
    const [redirect, setRedirect] = useState(false);
    const [type, setType] = useState('');

    const router = useRouter();

    if (redirect) {
        if (type == 'CUSTOMER') router.push('/');
        if (type == 'SELLER') router.push('/dashboard/profile');
    }

    const schema = yup.object().shape({
        email: yup.string().required('user name is required!'),
        password: yup.string().required('password is required!')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const loginHandle = (data) => {
        Axios.post('http://localhost:3000/api/auth/login', data)
            .then((response) => {
                fetchResult(response);
            })
            .catch((error) => {
                fetchError(error);
            });
    };

    const fetchResult = (response) => {
        if (response.status == 200) {
            toast.success('LOGIN SUCCESSFULLY');

            setTimeout(() => {
                localStorage.setItem('access_token', JSON.stringify(response.data.data.token));
                localStorage.setItem('user_data', JSON.stringify(response.data.data.otherDetails));

                setType(response.data.data.otherDetails.role);
                setRedirect(true);
            }, 2000);
        }
    };

    const fetchError = (error) => {
        const errorMessage = error.response.data.message;
        if (errorMessage != null) toast.error(errorMessage);

        toast.error('CONNECTION ERROR TRY AGAIN');
    };

    return (
        <Layout title="Login Page">
            <div className="bg-zinc-800 min-h-screen w-screen flex items-center">
                <div className="bg-white rounded-lg w-96 p-8 m-auto">
                    <div className="flex justify-end text-blue-600 font-medium text-sm mb-4">
                        <Link href={'/'}>BACK TO HOME</Link>
                    </div>

                    <h1 className="text-4xl font-semibold text-center mb-2 p-4 rounded-lg bg-zinc-200">Login</h1>
                    <form onSubmit={handleSubmit(loginHandle)}>
                        <div className="flex flex-col">
                            <label className="flex mt-3 mb-0.5 ml-1">User Name</label>
                            <input type="text" placeholder="email" className="input-style-1" {...register('email')} />
                            {errors.email && <div className="text-red-500 mt-1">{errors.email.message}</div>}

                            <label className="flex mt-3 mb-0.5 ml-1">Password</label>
                            <input type="password" placeholder="password" className="input-style-1" {...register('password')} />
                            {errors.password && <div className="text-red-500 mt-1">{errors.password.message}</div>}
                        </div>

                        <div className="flex justify-between mt-2">
                            <Link href={'/'}>forgot password</Link>
                            <Link href={'/register'} className="text-blue-600 font-medium text-sm">
                                REGISTER
                            </Link>
                        </div>

                        <button type="submit" className="btn-primary mt-5 w-full">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
