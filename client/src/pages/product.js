/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import data from '../utils/productData';
import Layout from '@/components/Layout';
import ImageGallery from 'react-image-gallery';

export default function Product() {
    const router = useRouter();
    const { id } = router.query;

    const product = data.products.filter((prduct) => {
        return id == prduct.id;
    });

    const [regularPrice, setRegularPrice] = useState(product[0]?.regularPrice[0]);
    const [salePrice, setSalePrice] = useState(product[0]?.salePrice[0]);
    const [inStock, setInStock] = useState(product[0]?.inStock[0]);

    const images = [];

    for (let index = 0; index < product[0]?.img.length; index++) {
        images.push({ original: product[0].img[index], thumbnail: product[0].img[index] });
    }

    const handleSelectChange = (event) => {
        const index = product[0].size.indexOf(event.target.value);
        setRegularPrice(product[0].regularPrice[index]);
        setSalePrice(product[0].salePrice[index]);
        setInStock(product[0].inStock[index]);
    };

    return (
        <Layout title="Product Page">
            <div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <ImageGallery items={images} />;
                    </div>
                    <div>
                        <h1 className="text-5xl font-medium text-zinc-800">{product[0]?.name}</h1>
                        <h1>Rs: {regularPrice}</h1>
                        <h1>Rs: {salePrice}</h1>
                        <h1>{product[0]?.ratings}</h1>

                        <select onChange={handleSelectChange}>
                            {product[0]?.size.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <h1>{product[0]?.sizeName}</h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
