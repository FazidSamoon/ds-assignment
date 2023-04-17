import Layout from '@/components/Layout';
import Axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

export default function Register() {
    const [redirect, setRedirect] = useState(false);
    const [conditions, setConditions] = useState(false);

    const router = useRouter();

    if (redirect) {
        router.push('/login');
    }

    const schema = yup.object().shape({
        firstName: yup.string().required('first name is required!').min(3, 'must be at least 3 characters'),
        lastName: yup.string().required('last name is required!').min(3, 'must be at least 3 characters'),
        email: yup.string().email().required('email is required!'),
        password: yup
            .string()
            .required('password is required!')
            .min(8, 'must be at least 8 characters')
            .max(30)
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`|}{[\]:;?/=>.<,-]).{8,}$/, 'not strong password'),
        confirm: yup
            .string()
            .required('confirm password is required!')
            .oneOf([yup.ref('password'), null], 'password mismatch'),
        role: yup.string().required('user role is required!')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const registerHandle = (data) => {
        const { confirm, ...validatedData } = data;

        if (conditions) {
            Axios.post('http://localhost:3000/api/auth/register', validatedData)
                .then((response) => {
                    fetchResult(response);
                })
                .catch((error) => {
                    fetchError(error);
                });
        } else {
            toast.error('accept terms and condition to continue');
        }
    };

    const fetchResult = (response) => {
        if (response.status == 200) {
            toast.success('registered successfully');
        }

        setRedirect(true);
    };

    const fetchError = (error) => {
        const errorMessage = error.response.data.message;
        {
            errorMessage && toast.error(errorMessage);
        }

        toast.error('connection error try again');
    };

    return (
        <Layout title="Sign-Up Page">
            <div className="bg-zinc-800 min-h-screen w-screen flex items-center">
                <div className="bg-white rounded-lg w-1/2 p-8 m-auto">
                    <div className="flex justify-end text-blue-600 font-medium text-sm mb-4">
                        <Link href={'/'}>BACK TO HOME</Link>
                    </div>

                    <h1 className="text-4xl font-semibold text-center mb-2 p-4 rounded-lg bg-zinc-200">Register</h1>
                    <form onSubmit={handleSubmit(registerHandle)}>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 pr-2">
                                <label className="flex mt-3 mb-0.5 ml-1">First Name</label>
                                <input type="text" placeholder="first name" className="input-style-1" {...register('firstName')} />
                                {errors.firstName && <div className="text-red-500 mt-1">{errors.firstName.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">Password</label>
                                <input type="password" placeholder="password" className="input-style-1" {...register('password')} />
                                {errors.password && <div className="text-red-500 mt-1">{errors.password.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">Email</label>
                                <input type="email" placeholder="email" className="input-style-1" {...register('email')} />
                                {errors.email && <div className="text-red-500 mt-1">{errors.email.message}</div>}
                            </div>
                            <div className="flex flex-col w-1/2 pl-2">
                                <label className="flex mt-3 mb-0.5 ml-1">Last Name</label>
                                <input type="text" placeholder="last name" className="input-style-1" {...register('lastName')} />
                                {errors.lastName && <div className="text-red-500 mt-1">{errors.lastName.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">Confirm Password</label>
                                <input type="password" placeholder="password" className="input-style-1" {...register('confirm')} />
                                {errors.confirm && <div className="text-red-500 mt-1">{errors.confirm.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">User Role</label>
                                <select className="input-style-1 border border-zinc-800 rounded-lg py-1 px-1" {...register('role')}>
                                    <option value="CUSTOMER">Customer</option>
                                    <option value="SELLER">Seller</option>
                                </select>
                                {errors.role && <div className="text-red-500 mt-1">{errors.role.message}</div>}
                            </div>
                        </div>

                        <div className="flex mt-3">
                            <input type="checkbox" onClick={() => setConditions(!conditions)} />
                            <p className="m-auto ml-1">I accept all terms and conditions</p>
                        </div>

                        <button type="submit" className="btn-primary mt-3">
                            Register
                        </button>
                    </form>

                    <div className="flex mt-3">
                        <p className="mr-2">already have an account</p>
                        <Link href={'/login'} className="text-blue-600 mt-0.5 font-medium text-sm">
                            LOGIN
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
