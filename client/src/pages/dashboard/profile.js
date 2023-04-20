import Dashboard from '../dashboard';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { Backward, Confirm, Delete, Edit } from '@/utils/iconData';
import { updateUser } from '../api/User';

export default function Profile() {
    let userData;
    if (typeof window !== 'undefined') userData = JSON.parse(localStorage.getItem('user_data'));

    const [isUpdating, setIsUpdating] = useState(false);
    const inputStyle = isUpdating ? 'input-style-1 w-full' : 'input-style-1 w-full text-zinc-700';
    const router = useRouter();

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
        const userId = userData._id;
        const updatedData = data;
        updateUser(userId, updatedData);

        setTimeout(() => {
            const accessToken = JSON.parse(localStorage.getItem('access_token'));
            if (accessToken == null) router.push('/login');
        }, 2000);
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
        <Dashboard title="Dashboard Profile">
            <div className="min-h-screen w-4/5 mx-auto items-center">
                <h1 className="text-xl font-semibold text-center my-8 p-4 rounded-lg text-zinc-800 bg-white">SELLER PROFILE</h1>

                <div className="bg-white p-8 rounded-lg">
                    <form onSubmit={handleSubmit(profileHandle)}>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-1 w-full">
                                <label className="flex mb-0.5 ml-1">First Name</label>
                                <input type="text" defaultValue={userData?.firstName} className={inputStyle} readOnly={!isUpdating} {...register('firstName')} />
                                {errors.firstName && <div className="text-red-500 mt-1">{errors.firstName.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">Email</label>
                                <input type="email" value={userData?.email} className={inputStyle} readOnly {...register('email')} />
                                {errors.email && <div className="text-red-500 mt-1">{errors.email.message}</div>}
                            </div>
                            <div className="col-span-1 w-full">
                                <label className="flex mb-0.5 ml-1">Last Name</label>
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
        </Dashboard>
    );
}
