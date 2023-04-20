/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { fetchError } from '@/components/Common';
import Axios from 'axios';

export default function Product() {
    const [product, setProduct] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/product/${id}`)
            .then((response) => {
                setProduct(response.data.data);
            })
            .catch((error) => {
                fetchError(error);
            });
    }, [id]);

    return (
        <Layout title="Product Page">
            <div>
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2">
                        <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="rounded-lg" />
                    </div>
                    <div className="col-span-3">
                        <h1 className="text-5xl font-medium text-zinc-800">{product.name}</h1>
                        <h1>Rs: {product.price}</h1>
                        <h1>Rs: {product.price}</h1>

                        <h1>{product.description}</h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
