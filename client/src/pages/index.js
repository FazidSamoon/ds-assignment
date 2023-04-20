/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useEffect, useState } from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import data from '../utils/productData';
import { fetchError } from '@/components/Common';
import Axios from 'axios';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Home() {
    const [email, setEmail] = useState('');
    const [allProduct, setAllProduct] = useState([]);
    const [ethnicProduct, setEthnicProduct] = useState([]);
    const [veganProduct, setVeganProduct] = useState([]);
    const [gourmetProduct, setGourmetProduct] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/product/')
            .then((response) => {
                setAllProduct(response.data.data);

                setEthnicProduct(allProduct.filter((product) => product.category === 'Ethnic').slice(0, 10));
                setVeganProduct(allProduct.filter((product) => product.category === 'Vegan').slice(0, 10));
                setGourmetProduct(allProduct.filter((product) => product.category === 'Gourmet').slice(0, 10));
            })
            .catch((error) => {
                fetchError(error);
            });
    }, [allProduct]);

    const subscribeHandle = (event) => {
        setEmail(event.target.value);
    };

    return (
        <Layout title="Home Page">
            <Swiper spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000 }}>
                <SwiperSlide>
                    <img src="/slider-1.jpg" alt="web-promo-slider" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/slider-2.jpg" alt="web-promo-slider" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/slider-3.jpg" alt="web-promo-slider" />
                </SwiperSlide>
            </Swiper>

            {/* Ethnic Foods */}
            <div className="mx-20 my-12 product-swiper">
                <div className="flex justify-between mb-6">
                    <h1 className="card-title">Ethnic Foods </h1>
                    <button className="card-button">SEE ALL</button>
                </div>

                <Swiper slidesPerView={3} spaceBetween={60}>
                    {ethnicProduct.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Vegan Foods */}
            <div className="mx-20 my-12 product-swiper">
                <div className="flex justify-between mb-6">
                    <h1 className="card-title">Vegan Foods </h1>
                    <button className="card-button">SEE ALL</button>
                </div>

                <Swiper slidesPerView={3} spaceBetween={60}>
                    {veganProduct.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Gourmet Foods */}
            <div className="mx-20 my-12 product-swiper">
                <div className="flex justify-between mb-6">
                    <h1 className="card-title">Gourmet Foods</h1>
                    <button className="card-button">SEE ALL</button>
                </div>

                <Swiper slidesPerView={3} spaceBetween={60}>
                    {gourmetProduct.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="bg-fixed bg-cover bg-center h-80" style={{ backgroundImage: "url('/subscribe-background.jpg')" }}>
                <div className="flex justify-between items-center h-full mx-20">
                    <h1 className="text-4xl font-medium text-white">SUBSCRIBE TO OUR NEWSLETTER</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="YOUR EMAIL ADDRESS"
                            className="bg-white px-8 py-4 rounded-lg shadow-lg focus:ring-2 focus:ring-zinc-800 outline-none border-transparent"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <button className="btn-subscribe" onClick={subscribeHandle}>
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
