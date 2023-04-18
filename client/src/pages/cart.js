import Layout from '@/components/Layout';
import PageTitle from '@/components/PageTitle';
import data from '@/utils/productData';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Cart() {
    const [quantity, setQuantity] = useState(1);

    if (quantity < 1) {
        setQuantity(1);
    }
    if (quantity > data.products[0].inStock) {
        setQuantity(data.products[0].inStock);
    }

    return (
        <Layout title="Cart Page">
            <PageTitle title="SHOPPING CART" image="/cart-title.jpg" />

            <div className="grid grid-cols-5 gap-4 mx-20 text-zinc-900">
                {/* CART PRODUCT */}
                <div className="col-span-4 mt-4">
                    <div className="grid grid-cols-4 text-lg font-medium my-4">
                        <h1>Product</h1>
                        <h1>Name</h1>
                        <h1>Price</h1>
                        <h1>Quantity</h1>
                    </div>
                    <div className="grid grid-cols-4 my-4">
                        <Image src="/food-1.jpg" alt="product" width={60} height={60} className="rounded-lg" />
                        <h1>{data.products[0].name}</h1>
                        <h1>Rs: {data.products[0].salePrice[0]}</h1>
                        <div className="flex h-10">
                            <h1 onClick={() => setQuantity(quantity - 1)} className="cursor-pointer text-2xl bg-white rounded-lg px-2 mx-2">
                                -
                            </h1>
                            <input type="number" defaultValue={quantity} onChange={() => setQuantity} className="text-center w-12 pl-4 rounded-lg" />
                            <h1 onClick={() => setQuantity(quantity + 1)} className="cursor-pointer text-2xl bg-white rounded-lg px-2 mx-2">
                                +
                            </h1>
                        </div>
                    </div>
                </div>

                {/* CHECK OUT */}
                <div className="col-span-1 mt-8">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="flex justify-between">
                            <h1>Subtotal</h1>
                            <h1>Rs: 3500.00</h1>
                        </div>
                        <div className="flex justify-between mt-2">
                            <h1>Discount</h1>
                            <h1>Rs: 0.00</h1>
                        </div>
                        <div className="border-b-2 border-zinc-900 my-2"></div>
                        <div className="flex justify-between">
                            <h1>Total</h1>
                            <h1>Rs: 3500.00</h1>
                        </div>
                    </div>
                    <button className="bg-zinc-800 text-white rounded-lg w-full p-2 font-medium mt-4">Check out</button>
                </div>
            </div>
        </Layout>
    );
}
