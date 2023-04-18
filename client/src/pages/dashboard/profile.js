import Dashboard from '../dashboard';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { fetchError } from '@/components/Common';
import { toast } from 'react-toastify';
import { Confirm, Delete, Edit } from '@/utils/iconData';

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

            //Delet Axios

            router.push('/register');
        }
    };

    return (
        <Dashboard title="Dashboard Profile">
            <div className="min-h-screen w-4/5 mx-auto items-center">
                <h1 className="text-3xl font-semibold text-center my-8 p-4 rounded-lg text-zinc-800 bg-white">SELLER PROFILE</h1>

                <div className="bg-white p-8 rounded-lg">
                    <form onSubmit={handleSubmit(profileHandle)}>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-1 w-full">
                                <label className="flex mb-0.5 ml-1">First Name</label>
                                <input type="text" defaultValue={firstName} className="input-style-1 w-full" readOnly={!isUpdating} {...register('firstName')} />
                                {errors.firstName && <div className="text-red-500 mt-1">{errors.firstName.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">Email</label>
                                <input type="email" value={email} className="input-style-1 w-full" readOnly {...register('email')} />
                                {errors.email && <div className="text-red-500 mt-1">{errors.email.message}</div>}
                            </div>
                            <div className="col-span-1 w-full">
                                <label className="flex mb-0.5 ml-1">Last Name</label>
                                <input type="text" defaultValue={lastName} className="input-style-1 w-full" readOnly={!isUpdating} {...register('lastName')} />
                                {errors.lastName && <div className="text-red-500 mt-1">{errors.lastName.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">User Role</label>
                                <input type="text" value={role} className="input-style-1 w-full" readOnly {...register('role')} />
                                {errors.role && <div className="text-red-500 mt-1">{errors.role.message}</div>}
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            {updateBtn && (
                                <button type="button" onClick={() => onClickButton('u')} className="flex gap-2 bg-zinc-800 rounded-lg text-white px-4 py-2 text-lg mr-3">
                                    <Edit />
                                    Update
                                </button>
                            )}
                            {confirmBtn && (
                                <div>
                                    <button type="submit" className="flex gap-2 bg-zinc-800 rounded-lg text-white px-4 py-2 text-lg mr-3">
                                        <Confirm />
                                        Confirm
                                    </button>
                                    <h1 className="text-blue-500 mt-2 font-medium">Please note that only the first name and last name fields can be updated</h1>
                                </div>
                            )}
                            {deleteBtn && (
                                <button type="button" onClick={() => onClickButton('d')} className="flex gap-2 bg-zinc-800 rounded-lg text-white px-4 py-2 text-lg mr-3">
                                    <Delete />
                                    Delete
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Dashboard>
    );
}
