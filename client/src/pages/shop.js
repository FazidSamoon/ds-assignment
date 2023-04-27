import Layout from '@/components/Layout';
import PageTitle from '@/components/PageTitle';
import ProductCard from '@/components/ProductCard';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Shop() {
    const [allProduct, setAllProduct] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/product/')
            .then((response) => {
                setAllProduct(response.data.data);
            })
            .catch((error) => {
                fetchError(error);
            });
    }, []);

    return (
        <Layout title="Shop Page">
            <PageTitle title="SHOP" image="/shop-title.jpg" />

            <div className="my-12 mx-20">
                <div className="grid grid-cols-5 gap-12">
                    {allProduct.map((product) => (
                        <ProductCard key={product.id} product={product} className="h-20" />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
