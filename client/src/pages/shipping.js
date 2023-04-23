import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Confirm, Delete, Edit } from '@/utils/iconData';
import { useRouter } from 'next/router';

export default function Shipping() {
    const [isHave, setIsHave] = useState(false);
    const router = useRouter();

    let shippingData;
    if (typeof window !== 'undefined') shippingData = JSON.parse(localStorage.getItem('shipping_data'));

    useEffect(() => {
        if (shippingData) {
            setIsHave(true);
        }
    }, [shippingData]);

    const schema = yup.object().shape({
        fullName: yup.string().required('full name is required!').min(3, 'must be at least 3 characters').max(40, 'can`t be contained more than 40 characters'),
        address: yup.string().required('address is required!').min(3, 'must be at least 3 characters').max(40, 'can`t be contained more than 40 characters'),
        city: yup.string().required('city is required!').min(3, 'must be at least 3 characters').max(40, 'can`t be contained more than 40 characters'),
        state: yup.string().required('state is required!').min(3, 'must be at least 3 characters').max(40, 'can`t be contained more than 40 characters'),
        postalCode: yup.string().required('postal code is required!').min(5, 'valid postal code must be at least 5 characters'),
        country: yup.string().required('country is required!'),
        phoneNumber: yup.string().required('phone number is required!').min(7, 'valid number must be at least 7 characters').max(15, 'valid number can`t be contained more than 15 characters'),
        companyName: yup.string()
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const shippingHandle = (data) => {
        const storedData = JSON.parse(localStorage.getItem('shipping_data'));
        if (isHave) {
            if (JSON.stringify(storedData) !== JSON.stringify(data)) {
                shippingData = data;
                localStorage.setItem('shipping_data', JSON.stringify(data));
                toast.success('shipping address updated successfully');
            } else {
                toast.warning('no changes to shipping address were made');
            }
        } else {
            shippingData = data;
            localStorage.setItem('shipping_data', JSON.stringify(data));
            toast.success('Great! shipping address set successfully');
            setTimeout(() => {
                router.push('/cart');
            }, 2000);
        }
    };

    const deleteHandle = () => {
        localStorage.removeItem('shipping_data');
        shippingData = null;
        setIsHave(false);
        location.reload();
    };

    return (
        <Layout title="Shipping Page">
            <div className="bg-zinc-800 min-h-screen w-screen flex items-center">
                <div className="bg-white rounded-lg w-1/2 p-8 m-auto">
                    <div className="flex justify-end text-blue-600 font-medium text-sm mb-4">
                        <Link href={'/'}>BACK TO HOME</Link>
                    </div>

                    <h1 className="text-4xl font-semibold text-center mb-2 p-4 rounded-lg bg-zinc-200">Shipping Address</h1>
                    <form onSubmit={handleSubmit(shippingHandle)}>
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 pr-2">
                                <label className="flex mt-3 mb-0.5 ml-1">Full Name</label>
                                <input type="text" placeholder="David Lee" defaultValue={shippingData?.fullName} className="input-style-1" {...register('fullName')} />
                                {errors.fullName && <div className="text-red-500 mt-1">{errors.fullName.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">Address</label>
                                <input type="text" placeholder="123 Main St, Apt 4B" defaultValue={shippingData?.address} className="input-style-1" {...register('address')} />
                                {errors.address && <div className="text-red-500 mt-1">{errors.address.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">Country</label>
                                <input type="text" placeholder="United States" defaultValue={shippingData?.country} className="input-style-1" {...register('country')} />
                                {errors.country && <div className="text-red-500 mt-1">{errors.country.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">Company name (optional)</label>
                                <input type="text" placeholder="ABC Corporation" defaultValue={shippingData?.companyName} className="input-style-1" {...register('companyName')} />
                                {errors.companyName && <div className="text-red-500 mt-1">{errors.companyName.message}</div>}
                            </div>
                            <div className="flex flex-col w-1/2 pl-2">
                                <label className="flex mt-3 mb-0.5 ml-1">Phone Number</label>
                                <input type="text" placeholder="555-123-4567" defaultValue={shippingData?.phoneNumber} className="input-style-1" {...register('phoneNumber')} />
                                {errors.phoneNumber && <div className="text-red-500 mt-1">{errors.phoneNumber.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">City</label>
                                <input type="text" placeholder="Anytown" defaultValue={shippingData?.city} className="input-style-1" {...register('city')} />
                                {errors.city && <div className="text-red-500 mt-1">{errors.city.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">State/Province/Region</label>
                                <input type="text" placeholder="California" defaultValue={shippingData?.state} className="input-style-1" {...register('state')} />
                                {errors.state && <div className="text-red-500 mt-1">{errors.state.message}</div>}

                                <label className="flex mt-3 mb-0.5 ml-1">Postal Code</label>
                                <input type="text" placeholder="67890" defaultValue={shippingData?.postalCode} className="input-style-1" {...register('postalCode')} />
                                {errors.postalCode && <div className="text-red-500 mt-1">{errors.postalCode.message}</div>}
                            </div>
                        </div>
                        {isHave ? (
                            <div className="flex gap-4">
                                <button type="submit" className="mt-6 flex gap-1 bg-blue-600 text-white rounded-lg px-4 py-3">
                                    <Edit />
                                    <h1>UPDATE</h1>
                                </button>
                                <button type="button" onClick={() => deleteHandle()} className="mt-6 flex gap-1 bg-red-600 text-white rounded-lg px-4 py-3">
                                    <Delete />
                                    <h1>Delete</h1>
                                </button>
                            </div>
                        ) : (
                            <button type="submit" className="mt-6 flex gap-1 bg-zinc-800 text-white rounded-lg px-4 py-3">
                                <Confirm />
                                <h1>SUBMIT</h1>
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </Layout>
    );
}
