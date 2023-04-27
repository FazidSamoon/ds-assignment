import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Confirm } from '@/utils/iconData';
import { createProduct } from '../api/Product';

export default function Create() {
    const schema = yup.object().shape({
        name: yup.string().required('name is required!').min(3, 'must be at least 3 characters'),
        description: yup.string().required('description is required!').min(10, 'must be at least 10 characters'),
        price: yup.number().typeError('price is required').required(),
        discount: yup.number().typeError('discount is required'),
        image: yup
            .mixed()
            .required('Please select an image')
            .test('fileFormat', 'Unsupported file format', (value) => {
                if (!value || !value.type) {
                    return true;
                }

                return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
            })
            .test('fileSize', 'File size is too large', (value) => {
                if (!value || !value.size) {
                    return true;
                }

                return value.size <= 2 * 1024 * 1024;
            }),
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
        const userData = JSON.parse(localStorage.getItem('user_data'));
        const sellerId = userData._id;
        const accessToken = JSON.parse(localStorage.getItem('access_token'));

        try {
            const imageFile = data.image[0];
            const base64Image = await readFileAsBase64(imageFile);
            const productData = {
                ...data,
                sellerId,
                image: base64Image
            };
            console.log(productData);
            await createProduct(productData, accessToken);
        } catch (error) {
            console.log(error);
        }
    };

    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(productHandle)}>
                <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1 w-full">
                        <label className="flex mb-0.5 ml-1">Product Name</label>
                        <input type="text" className="input-style-1 w-full" placeholder="Chicken Burrito Roll" {...register('name')} />
                        {errors.name && <div className="text-red-500 mt-1">{errors.name.message}</div>}

                        <label className="flex mt-3 mb-0.5 ml-1">Price : (LKR)</label>
                        <input type="number" className="input-style-1 w-full" placeholder="0.00" {...register('price')} />
                        {errors.price && <div className="text-red-500 mt-1">{errors.price.message}</div>}

                        <label className="flex mt-3 mb-0.5 ml-1">Stock Quantity</label>
                        <input type="number" className="input-style-1 w-full" defaultValue={1} {...register('inStock')} />
                        {errors.inStock && <div className="text-red-500 mt-1">{errors.inStock.message}</div>}
                    </div>
                    <div className="col-span-1 w-full">
                        <label className="flex mb-0.5 ml-1">Category</label>
                        <select defaultValue="Ethnic" className="input-style-1 w-full border border-zinc-800 rounded-lg py-1 px-1" {...register('category')}>
                            <option value="Ethnic">Ethnic</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Gourmet">Gourmet</option>
                        </select>
                        {errors.category && <div className="text-red-500 mt-1">{errors.category.message}</div>}

                        <label className="flex mt-3 mb-0.5 ml-1">Discount : (%)</label>
                        <input type="number" className="input-style-1 w-full" defaultValue={0} {...register('discount')} />
                        {errors.discount && <div className="text-red-500 mt-1">{errors.discount.message}</div>}

                        <label className="flex mt-3 mb-0.5 ml-1">Upload Image</label>
                        <input type="file" className="mt-2" {...register('image')} />
                        {errors.image && <div className="text-red-500 mt-1">{errors.image.message}</div>}
                    </div>
                </div>

                <div className="w-full">
                    <label className="flex mt-3 mb-0.5 ml-1">Product Description</label>
                    <textarea name="description" id="description" cols="30" rows="4" className="input-style-1 w-full" {...register('description')}></textarea>
                    {errors.description && <div className="text-red-500 mt-1">{errors.description.message}</div>}
                </div>

                <button type="submit" className="flex gap-2 bg-zinc-800 rounded-lg text-white px-4 py-2 mr-3 mt-6">
                    <Confirm />
                    Publish
                </button>
            </form>
        </div>
    );
}
