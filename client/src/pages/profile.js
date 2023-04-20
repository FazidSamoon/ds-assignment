import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { fetchError } from '@/components/Common';
import { toast } from 'react-toastify';

export default function Profile() {
    let userData;
    if (typeof window !== 'undefined') {
        userData = JSON.parse(localStorage.getItem('user_data'));
    }

    const router = useRouter();

    const [firstName, setFirstName] = useState(userData?.firstName);
    const [lastName, setLastName] = useState(userData?.lastName);
    const [email, setEmail] = useState(userData?.email);
    const [role, setRole] = useState(userData?.role);
    const [isUpdating, setIsUpdating] = useState(false);

    const [updateBtn, setUpdateBtn] = useState(true);
    const [confirmBtn, setConfirmBtn] = useState(false);
    const [deleteBtn, setDeleteBtn] = useState(true);

    const schema = yup.object().shape({
        firstName: yup.string().required('first name is required!').min(3, 'must be at least 3 characters'),
        lastName: yup.string().required('last name is required!').min(3, 'must be at least 3 characters'),
        email: yup.string().email().required('email is required!'),
        role: yup.string().required('user role is required!')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const profileHandle = (data) => {
        Axios.patch(`http://localhost:3000/api/auth/update/${userData._id}`, data)
            .then((res) => {
                fetchResult(res);
            })
            .catch((err) => {
                fetchError(err);
            });
    };

    const fetchResult = (res) => {
        if (res.status == 200) {
            toast.success('UPDATE SUCCESSFULLY');

            setTimeout(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_data');

                router.push('/login');
            }, 2000);
        }
    };

    const onClickButton = (res) => {
        if (res == 'u') {
            setUpdateBtn(false);
            setDeleteBtn(false);
            setConfirmBtn(true);
            setIsUpdating(true);
        }
        if (res == 'd') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_data');

            //Delete Axios

            router.push('/register');
        }
    };

    return (
        <Layout title="Profile Page">
            <div className="bg-zinc-800 min-h-screen w-screen flex items-center">
                <div className="bg-white rounded-lg w-1/2 p-8 m-auto">
                    <div className="flex justify-end text-blue-600 font-medium text-sm mb-4">
                        <Link href={'/'}>BACK TO HOME</Link>
                    </div>

                    <h1 className="text-4xl font-semibold text-center mb-2 p-4 rounded-lg bg-zinc-200">Profile</h1>
                    <form onSubmit={handleSubmit(profileHandle)}>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 pr-2">
                                <label className="flex mt-3 mb-0.5 ml-1">First Name</label>
                                <input type="text" defaultValue={firstName} className="input-style-1" readOnly={!isUpdating} {...register('firstName')} />
                                {errors.firstName && <div className="text-red-500 mt-1">{errors.firstName.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">Email</label>
                                <input type="email" value={email} className="input-style-1" readOnly {...register('email')} />
                                {errors.email && <div className="text-red-500 mt-1">{errors.email.message}</div>}
                            </div>
                            <div className="flex flex-col w-1/2 pl-2">
                                <label className="flex mt-3 mb-0.5 ml-1">Last Name</label>
                                <input type="text" defaultValue={lastName} className="input-style-1" readOnly={!isUpdating} {...register('lastName')} />
                                {errors.lastName && <div className="text-red-500 mt-1">{errors.lastName.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">User Role</label>
                                <input type="text" value={role} className="input-style-1" readOnly {...register('role')} />
                                {errors.role && <div className="text-red-500 mt-1">{errors.role.message}</div>}
                            </div>
                        </div>

                        <div className="mt-4">
                            {updateBtn && (
                                <button type="button" onClick={() => onClickButton('u')} className="btn-primary mr-3">
                                    Update
                                </button>
                            )}
                            {confirmBtn && (
                                <div>
                                    <button type="submit" className="btn-primary mr-3">
                                        Confirm
                                    </button>
                                    <h1 className="text-blue-500 mt-2 font-medium">Please note that only the first name and last name fields can be updated</h1>
                                </div>
                            )}
                            {deleteBtn && (
                                <button type="button" onClick={() => onClickButton('d')} className="btn-primary mr-3">
                                    Delete
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
