import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Axios from 'axios';
import Cookies from 'js-cookie';

export default function Layout({ title, children }) {
    const inactiveLink = 'mx-1';
    const activeLink = inactiveLink + ' border-b-2 border-b-zinc-800';

    const router = useRouter();
    const { pathname } = router;

    const [page, setPage] = useState(true);
    const checkPage = () => {
        if (pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/product')) {
            setPage(false);
        }
    };

    const cardHandle = () => {
        const access_token = Cookies.get('access_token');
    };

    const fetchResult = (response) => {
        console.log(response);
    };

    const fetchError = (error) => {
        console.log(error);
    };

    return (
        <>
            <Head>
                <title>{title ? title + ' - VP STORES' : 'VP STORES'}</title>
                <meta name="description" content="Ecommerce Website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer position="bottom-center" limit={1} className="text-center" />
            <div className="flex min-h-screen flex-col justify-between">
                {/* HEADER */}
                {page && (
                    <header className="bg-zinc-100 pt-4 pb-4">
                        <nav className="flex h-12 items-center px-4 justify-between">
                            <Link href="/">
                                <p className="text-lg font-bold">VP STORES</p>
                            </Link>

                            <div className="flex">
                                <div className="flex items-center">
                                    <Link href="/" className={pathname === '/' ? activeLink : inactiveLink}>
                                        <p className="mx-2 py-1.5">Home</p>
                                    </Link>
                                    <Link href="/shop" className={pathname.includes('/shop') ? activeLink : inactiveLink}>
                                        <p className="mx-2 py-1.5">Shop</p>
                                    </Link>
                                    <Link href="/about" className={pathname.includes('/about') ? activeLink : inactiveLink}>
                                        <p className="mx-2 py-1.5">About</p>
                                    </Link>
                                    <Link href="/contact" className={pathname.includes('/contact') ? activeLink : inactiveLink}>
                                        <p className="mx-2 py-1.5">Contact</p>
                                    </Link>
                                </div>

                                <div className="flex bg-white items-center rounded m-2 ml-3 p-1">
                                    <input type="text" placeholder="Search product" className="border-none outline-none focus:ring-0 pl-4" />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div onClick={cardHandle}>
                                    <p className="p-2 flex border-2 border-zinc-900 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                        </svg>
                                    </p>
                                </div>

                                <Link href="/login">
                                    <p className="p-2 flex border-2 border-zinc-900 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path
                                                fillRule="evenodd"
                                                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </p>
                                </Link>
                            </div>
                        </nav>
                        {checkPage()}
                    </header>
                )}

                {/* CONTENT */}
                <main className="container m-auto">{children}</main>

                {/* FOOTER */}
                {page && (
                    <footer className="flex h-12 justify-center items-center">
                        <Footer />
                    </footer>
                )}
            </div>
        </>
    );
}
