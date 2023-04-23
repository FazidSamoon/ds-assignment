/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { addToCart, fetchError } from '@/components/Common';
import Axios from 'axios';
import { CartSolid } from '@/utils/iconData';

export default function Product() {
    const [product, setProduct] = useState([]);
    const [qut, setQut] = useState(1);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/product/${id}`)
            .then((response) => {
                setProduct(response.data.data);
                console.log(response);
            })
            .catch((error) => {
                fetchError(error);
            });
    }, [id]);

    const handleDecrease = () => {
        if (qut > 1) {
            setQut(qut - 1);
        }
    };

    const handleIncrease = () => {
        if (qut < product.inStock) {
            setQut(qut + 1);
        }
    };

    const checkQut = (e) => {
        const newQty = parseInt(e.target.value);
        if (!isNaN(newQty) && newQty >= 1 && newQty <= product.inStock) {
            setQut(newQty);
        }
    };

    return (
        <Layout title="Product Page">
            <div className="my-6 mx-20">
                <div className="grid grid-cols-8 gap-12">
                    <div className="col-span-3">
                        <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="rounded-lg" />
                    </div>
                    <div className="col-span-3">
                        <div className="flex gap-4">
                            <h1 className="text-4xl font-medium text-zinc-800">{product.name}</h1>
                            <h1 className="text-xl font-medium bg-green-600 text-white rounded-lg p-2">{product.category}</h1>
                        </div>
                        <h1 className="mt-2">{product.description}</h1>

                        <div className="flex justify-between mt-2">
                            <div className="flex bg-white rounded-lg p-2">
                                <h1 className="cursor-pointer" onClick={handleDecrease}>
                                    -
                                </h1>
                                <input type="number" value={qut} onChange={checkQut} className="text-center w-16 outline-none" />
                                <h1 className="cursor-pointer" onClick={handleIncrease}>
                                    +
                                </h1>
                            </div>

                            <h1 className="font-medium text-lg">LKR: {product.price * qut}</h1>
                        </div>

                        <div className="mt-4">
                            <button type="button" className="flex gap-2 btn-primary">
                                <CartSolid />
                                <h1 className="font-medium" onClick={() => addToCart(product, qut)}>
                                    Add to Cart
                                </h1>
                            </button>
                        </div>
                    </div>

                    <div className="col-span-2 border-2 border-zinc-800 rounded-lg"></div>
                </div>

                <div className="mt-12">
                    <h1 className="text-4xl font-medium text-zinc-800 text-center">Product Reviews</h1>
                </div>
            </div>
        </Layout>
    );
}
