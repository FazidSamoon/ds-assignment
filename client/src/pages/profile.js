import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { userLogout } from '@/components/Common';
import { toast } from 'react-toastify';
import { updateUser } from './api/User';
import { Backward, Confirm, Delete, Edit } from '@/utils/iconData';

export default function Profile() {
    let userData;
    if (typeof window !== 'undefined') {
        userData = JSON.parse(localStorage.getItem('user_data'));
    }

    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const inputStyle = isUpdating ? 'input-style-1 w-full' : 'input-style-1 w-full text-zinc-700';

    const [updateBtn, setUpdateBtn] = useState(true);
    const [confirmBtn, setConfirmBtn] = useState(false);

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
        if (userData.firstName == data.firstName && userData.lastName == data.lastName) {
            toast.warning('no changes to profile were made');
        } else {
            updateUser(userData._id, data);
            setTimeout(() => {
                userLogout();

                router.push('/login');
            }, 2000);
        }
    };

    const handleDelete = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');

        //delete axios

        router.push('/register');
    };

    const handleButton = () => {
        setUpdateBtn(!updateBtn);
        setConfirmBtn(!confirmBtn);
        setIsUpdating(!isUpdating);
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
                                <input type="text" defaultValue={userData?.firstName} className={inputStyle} readOnly={!isUpdating} {...register('firstName')} />
                                {errors.firstName && <div className="text-red-500 mt-1">{errors.firstName.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">Email</label>
                                <input type="email" value={userData?.email} className={inputStyle} readOnly {...register('email')} />
                                {errors.email && <div className="text-red-500 mt-1">{errors.email.message}</div>}
                            </div>
                            <div className="flex flex-col w-1/2 pl-2">
                                <label className="flex mt-3 mb-0.5 ml-1">Last Name</label>
                                <input type="text" defaultValue={userData?.lastName} className={inputStyle} readOnly={!isUpdating} {...register('lastName')} />
                                {errors.lastName && <div className="text-red-500 mt-1">{errors.lastName.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">User Role</label>
                                <input type="text" value={userData?.role} className={inputStyle} readOnly {...register('role')} />
                                {errors.role && <div className="text-red-500 mt-1">{errors.role.message}</div>}
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            {updateBtn && (
                                <button type="button" onClick={handleButton} className="flex gap-2 bg-blue-600 rounded-lg text-white px-4 py-2 mr-3">
                                    <Edit />
                                    <h1 className="font-medium text-sm mt-0.5">Update</h1>
                                </button>
                            )}
                            {updateBtn && (
                                <button type="button" onClick={handleDelete} className="flex gap-1 bg-red-600 rounded-lg text-white px-4 py-2 mr-3">
                                    <Delete />
                                    <h1 className="font-medium text-sm mt-0.5">Delete</h1>
                                </button>
                            )}
                            {confirmBtn && (
                                <button type="submit" className="flex gap-1 bg-green-600 rounded-lg text-white px-4 py-2 mr-3">
                                    <Confirm />
                                    <h1 className="font-medium text-sm mt-0.5">Confirm</h1>
                                </button>
                            )}
                            {confirmBtn && (
                                <button type="button" onClick={handleButton} className="flex gap-1 bg-zinc-800 rounded-lg text-white px-4 py-2 mr-3">
                                    <Backward />
                                    <h1 className="font-medium text-sm mt-0.5">Back</h1>
                                </button>
                            )}
                        </div>
                        {confirmBtn && <h1 className="text-red-600 mt-4 font-medium">Please note that only the first name and last name fields can be updated</h1>}
                    </form>
                </div>
            </div>
        </Layout>
    );
}
