import Head from 'next/head';
import Footer from './Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import { CartSolid, ProfileSolid, SearchOutline } from '@/utils/iconData';
import { Menu } from '@headlessui/react';

export default function Layout({ title, children }) {
    const inactiveLink = 'mx-1';
    const activeLink = inactiveLink + ' border-b-2 border-b-zinc-800';

    const router = useRouter();
    const { pathname } = router;

    const [page, setPage] = useState(true);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem('access_token'));
        if (accessToken != null) {
            const decodedToken = jwtDecode(accessToken);
            if (decodedToken.exp * 1000 < new Date().getTime()) localStorage.removeItem('access_token');
            else setIsLogin(true);
        }
    }, []);

    const checkPage = () => {
        if (pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/profile') || pathname.includes('/dashboard')) {
            setPage(false);
        }
    };

    const onIconClick = (res) => {
        if (isLogin) {
            if (res == 'c') router.push('/cart');
        } else {
            if (res == 'c' || res == 'p') router.push('/login');
        }
    };

    const LogoutHandle = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');

        router.push('/login');
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
                    <header className="bg-zinc-100 py-4">
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
                                    <SearchOutline />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="cursor-pointer" onClick={() => onIconClick('c')}>
                                    <p className="p-2 flex border-2 border-zinc-900 rounded">
                                        <CartSolid />
                                    </p>
                                </div>

                                {!isLogin && (
                                    <div className="cursor-pointer" onClick={() => onIconClick('p')}>
                                        <p className="p-2 flex border-2 border-zinc-900 rounded">
                                            <ProfileSolid />
                                        </p>
                                    </div>
                                )}

                                {isLogin && (
                                    <div className="cursor-pointer" onClick={() => onIconClick('p')}>
                                        <p className="px-2 py-1.5 flex border-2 border-zinc-900 rounded">
                                            <Menu as="div" className="relative z-10">
                                                <div>
                                                    <Menu.Button>
                                                        <ProfileSolid />
                                                    </Menu.Button>
                                                </div>
                                                <Menu.Items className="absolute flex flex-col -right-3 top-10 gap-y-2 bg-zinc-100 border-2 border-zinc-800 text-zinc-800 rounded-lg">
                                                    <Menu.Item className="px-8 py-2 border-b-2 border-zinc-800">
                                                        <Link href={'/profile'}>
                                                            <h1 className="font-medium">PROFILE</h1>
                                                        </Link>
                                                    </Menu.Item>
                                                    <Menu.Item className="px-6 pb-2">
                                                        <a className="font-medium text-center" onClick={LogoutHandle}>
                                                            LOGOUT
                                                        </a>
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Menu>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </nav>
                        {checkPage()}
                    </header>
                )}

                {/* CONTENT */}
                <main className="container m-auto">{children}</main>

                {/* FOOTER */}
                {page && (
                    <footer className="flex justify-center items-center">
                        <Footer />
                    </footer>
                )}
            </div>
        </>
    );
}
