import { Backward, Confirm, Edit } from '@/utils/iconData';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { updateProduct } from '../api/Product';

export default function Update(props) {
    const productInfo = props.productInfo;
    const [confirmButton, setConfirmButton] = useState(false);
    const [updateButton, setUpdateButton] = useState(true);
    const [readOnly, setReadOnly] = useState(true);
    const inputStyle = readOnly ? 'input-style-1 w-full text-zinc-700' : 'input-style-1 w-full';

    const schema = yup.object().shape({
        name: yup.string().required('name is required!').min(3, 'must be at least 3 characters'),
        description: yup.string().required('description is required!').min(10, 'must be at least 10 characters'),
        price: yup.number().typeError('price is required').required(),
        discount: yup.number(),
        category: yup.string(),
        inStock: yup.number().required('quantity is required!').min(1, 'must be at least 1 product')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const productHandle = async (data) => {
        const productData = data;
        const productId = productInfo._id;
        const accessToken = JSON.parse(localStorage.getItem('access_token'));
        updateProduct(productId, productData, accessToken);
    };

    const handleButton = () => {
        setUpdateButton(!updateButton);
        setConfirmButton(!confirmButton);
        setReadOnly(!readOnly);
    };

    return (
        <>
            <form onSubmit={handleSubmit(productHandle)}>
                <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1 w-full">
                        <label className="flex mb-0.5 ml-1">Product Name</label>
                        <input type="text" defaultValue={productInfo.name} className={inputStyle} placeholder="Chicken Burrito Roll" readOnly={readOnly} {...register('name')} />
                        {errors.name && <div className="text-red-500 mt-1">{errors.name.message}</div>}

                        <label className="flex mt-3 mb-0.5 ml-1">Price : (LKR)</label>
                        <input type="number" defaultValue={productInfo.price} className={inputStyle} placeholder="0.00" readOnly={readOnly} {...register('price')} />
                        {errors.price && <div className="text-red-500 mt-1">{errors.price.message}</div>}

                        <label className="flex mt-3 mb-0.5 ml-1">Stock Quantity</label>
                        <input type="number" defaultValue={productInfo.inStock} className={inputStyle} readOnly={readOnly} {...register('inStock')} />
                        {errors.inStock && <div className="text-red-500 mt-1">{errors.inStock.message}</div>}
                    </div>
                    <div className="col-span-1 w-full">
                        <label className="flex mb-0.5 ml-1">Category</label>
                        <select defaultValue={productInfo.category} className={inputStyle} readOnly={readOnly} {...register('category')}>
                            <option value="Ethnic">Ethnic</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Gourmet">Gourmet</option>
                        </select>
                        {errors.category && <div className="text-red-500 mt-1">{errors.category.message}</div>}

                        <label className="flex mt-3 mb-0.5 ml-1">Discount : (%)</label>
                        <input type="number" className={inputStyle} defaultValue={productInfo.discount} readOnly={readOnly} {...register('discount')} />
                        {errors.discount && <div className="text-red-500 mt-1">{errors.discount.message}</div>}
                    </div>
                </div>

                <div className="w-full">
                    <label className="flex mt-3 mb-0.5 ml-1">Product Description</label>
                    <textarea defaultValue={productInfo.description} name="description" id="description" cols="30" rows="4" className={inputStyle} readOnly={readOnly} {...register('description')}></textarea>
                    {errors.description && <div className="text-red-500 mt-1">{errors.description.message}</div>}
                </div>

                <div className="flex">
                    {updateButton && (
                        <button type="button" className="flex gap-1 bg-blue-600 rounded-lg text-white px-4 py-2 mr-3 mt-6" onClick={handleButton}>
                            <Edit />
                            <h1 className="mt-0.5 font-medium text-sm">Update</h1>
                        </button>
                    )}

                    {confirmButton && (
                        <button type="submit" className="flex gap-1 bg-green-600 rounded-lg text-white px-4 py-2 mr-3 mt-6">
                            <Confirm />
                            <h1 className="mt-0.5 font-medium text-sm">Confirm</h1>
                        </button>
                    )}

                    <button type="button" className="flex gap-1 bg-zinc-800 rounded-lg text-white px-4 py-2 mr-3 mt-6" onClick={() => (updateButton ? props.setView('retrieve') : handleButton())}>
                        <Backward />
                        <h1 className="mt-0.5 font-medium text-sm">Go Back</h1>
                    </button>
                </div>
            </form>
        </>
    );
}
