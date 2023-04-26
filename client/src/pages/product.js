/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { addToCart, fetchError } from '@/components/Common';
import Axios from 'axios';
import { Add, CartSolid } from '@/utils/iconData';
import { Rating } from 'primereact/rating';
import { toast } from 'react-toastify';
import { addRatings } from './api/Ratings';

export default function Product() {
    const [product, setProduct] = useState([]);
    const [qut, setQut] = useState(1);
    const [discount, setDiscount] = useState();
    const [regularPrice, setRegularPrice] = useState();
    const [sellingPrice, setSellingPrice] = useState();

    const [value, setValue] = useState(null);
    const [review, setReview] = useState('');
    const [userData, setUserData] = useState();
    const [token, setToken] = useState();

    const [allRatings, setAllRatings] = useState();
    const [productRatings, setProductRatings] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            Axios.get(`http://localhost:3001/api/product/${id}`)
                .then((response) => {
                    setProduct(response.data.data);
                })
                .catch((error) => {
                    fetchError(error);
                });
        }
    }, [id]);

    useEffect(() => {
        if (product) setDiscount(product.discount);
    }, [product]);

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user_data')));
        setToken(JSON.parse(localStorage.getItem('access_token')));
    }, []);

    useEffect(() => {
        let sellingPr;
        if (discount) {
            setRegularPrice(product.price);
            sellingPr = regularPrice - (regularPrice * discount) / 100;
            setSellingPrice(sellingPr);
        }
    }, [discount, product, regularPrice]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('http://localhost:3004/api/ratings/');
                setAllRatings(response.data.data);
                setProductRatings(response.data.data.filter((rating) => rating.product === product._id));
                setIsLoading(false);
            } catch (error) {
                fetchError(error);
            }
        };

        fetchData();
    }, [product]);

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

    const addReview = () => {
        let reviewObj;
        if (value != null && review.length > 3) {
            reviewObj = {
                user: userData._id,
                product: product._id,
                ratingType: 'PRODUCT',
                seller: product.seller._id,
                rating: value,
                comment: review
            };
        } else {
            toast.warn('invalid review type');
        }

        addRatings(reviewObj, token);
    };

    console.log(productRatings);

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

                        <div className="flex justify-between mt-6">
                            <div className="flex bg-white rounded-lg p-2">
                                <h1 className="cursor-pointer items-center my-auto" onClick={handleDecrease}>
                                    -
                                </h1>
                                <input type="number" value={qut} onChange={checkQut} className="text-center w-16 pl-2 outline-none" />
                                <h1 className="cursor-pointer items-center my-auto" onClick={handleIncrease}>
                                    +
                                </h1>
                            </div>

                            <div className="flex gap-8">
                                <div className="font-medium">
                                    Regular Price{' '}
                                    <h1 className="text-red-600 font-medium text-lg">
                                        <s>LKR :{regularPrice}</s>
                                    </h1>
                                </div>
                                <div className="w-1 bg-zinc-800"></div>
                                <div className="font-medium">
                                    Selling Price <h1 className="text-green-600 font-medium text-lg"> LKR :{sellingPrice}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button type="button" className="flex gap-2 btn-primary w-full h-14 items-center justify-center mt-6">
                                <CartSolid />
                                <h1 className="font-medium text-xl" onClick={() => addToCart(product, qut)}>
                                    Add to Cart
                                </h1>
                            </button>
                        </div>
                    </div>

                    <div className="col-span-2 border-2 border-zinc-800 rounded-lg bg-white p-4">
                        <div className="font-medium">Summary</div>
                        <div className="border-b-2 border-zinc-900 my-2"></div>
                        <div className="flex justify-between">
                            <h1>Price :</h1>
                            <h1>LKR: {sellingPrice?.toFixed(2)}</h1>
                        </div>
                        <div className="flex justify-between">
                            <h1>Quantity :</h1>
                            <h1>{qut}</h1>
                        </div>
                        <div className="flex justify-between">
                            <h1>Subtotal :</h1>
                            <h1>LKR: {(product.price * qut)?.toFixed(2)}</h1>
                        </div>
                        <div className="flex justify-between">
                            <h1>Discount :</h1>
                            <h1>LKR: {(product.price * qut - sellingPrice * qut)?.toFixed(2)}</h1>
                        </div>
                        <div className="border-b-2 border-zinc-900 mb-2 mt-10"></div>
                        <div className="flex justify-between">
                            <h1>Total :</h1>
                            <h1>LKR: {(sellingPrice * qut)?.toFixed(2)}</h1>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="grid grid-cols-8 gap-12">
                        <div className="col-span-3">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-zinc-800 text-center mb-4">Your Reviews</h1>
                                <div className="card flex justify-content-center">
                                    <Rating value={value} onChange={(e) => setValue(e.value)} cancel={false} />
                                </div>
                            </div>

                            <textarea name="" id="" cols="30" rows="10" className="w-full rounded-lg p-2" onChange={(event) => setReview(event.target.value)}></textarea>
                            <div className="flex justify-end">
                                <button className="bg-zinc-800 rounded-lg text-white p-2 flex gap-1 relative bottom-16 right-4" onClick={() => addReview()}>
                                    <Add /> Add Review
                                </button>
                            </div>
                        </div>

                        <div className="col-span-5">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-zinc-800 text-center mb-4">Product Reviews ({productRatings.length})</h1>
                            </div>
                            <div className="w-full rounded-lg bg-white p-4">
                                {productRatings?.length < 1 ? (
                                    <h1>no review to show</h1>
                                ) : (
                                    productRatings.map((ratings) => (
                                        <div key={ratings.id}>
                                            <div className="flex justify-between">
                                                <h1>{ratings.createdAt.slice(0, 10)}</h1>
                                                <div className="card flex justify-content-center">
                                                    <Rating value={ratings.rating} cancel={false} />
                                                </div>
                                            </div>
                                            <h1 className="mt-1">{ratings.comment}</h1>
                                            <div className="w-full bg-zinc-800 h-px my-4"></div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
