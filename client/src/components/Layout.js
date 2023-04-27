import Head from 'next/head';
import Footer from './Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import { CartSolid, ProfileSolid } from '@/utils/iconData';
import { Menu } from '@headlessui/react';
import { userLogout } from './Common';

export default function Layout({ title, children }) {
    const [cartData, setCartData] = useState([]);
    const [userRole, setUserRole] = useState();
    const [page, setPage] = useState(true);
    const [isLogin, setIsLogin] = useState(false);

    const router = useRouter();
    const { pathname } = router;

    const inactiveLink = 'mx-1';
    const activeLink = inactiveLink + ' border-b-2 border-b-zinc-800';

    useEffect(() => {
        const interval = setInterval(() => {
            setCartData(JSON.parse(localStorage.getItem('cart_data')));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        if (userData?.role == 'SELLER') router.push('/unauthorized');
    }, [router]);

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem('access_token'));
        const userData = JSON.parse(localStorage.getItem('user_data'));
        setUserRole(userData?.role);
        if (accessToken != null) {
            const decodedToken = jwtDecode(accessToken);
            if (decodedToken.exp * 1000 < new Date().getTime()) localStorage.removeItem('access_token');
            else setIsLogin(true);
        }
    }, []);

    const checkPage = () => {
        if (pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/profile') || pathname.includes('/dashboard') || pathname.includes('/shipping') || pathname.includes('/payment')) {
            setPage(false);
        }
    };

    const onIconClick = (res) => {
        if (isLogin) {
            if (res == 'c') router.push('/cart');
            if (res == 'p' && userRole == 'SELLER') router.push('/dashboard/profile');
        } else {
            if (res == 'c' || res == 'p') router.push('/login');
        }
    };

    const LogoutHandle = () => {
        userLogout();
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
                        <nav className="flex h-14 items-center mx-10 justify-between">
                            <Link href="/">
                                <p className="text-xl text-zinc-900 font-bold">VP STORES</p>
                            </Link>

                            <div className="flex">
                                <div className="flex items-center text-lg font-medium text-zinc-900">
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
                            </div>

                            <div className="flex items-center gap-2">
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
                                                {userRole != 'SELLER' && (
                                                    <Menu.Items className="absolute w-44 flex flex-col -right-3 top-10 gap-y-2 bg-zinc-100 border-2 border-zinc-800 text-zinc-800 rounded-lg">
                                                        <Menu.Item className="px-4 py-2 border-b-2 border-zinc-800">
                                                            <Link href={'/profile'}>
                                                                <h1 className="font-medium text-center">User Profile</h1>
                                                            </Link>
                                                        </Menu.Item>
                                                        <Menu.Item className="px-4 py-2 border-b-2 border-zinc-800">
                                                            <Link href={'/order-history'}>
                                                                <h1 className="font-medium text-center">Order History</h1>
                                                            </Link>
                                                        </Menu.Item>
                                                        <Menu.Item className="px-4 py-2 border-b-2 border-zinc-800">
                                                            <Link href={'/shipping'}>
                                                                <h1 className="font-medium text-center">Shipping Address</h1>
                                                            </Link>
                                                        </Menu.Item>
                                                        <Menu.Item className="px-4 pb-2">
                                                            <a className="font-medium text-center" onClick={LogoutHandle}>
                                                                Logout
                                                            </a>
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                )}
                                            </Menu>
                                        </p>
                                    </div>
                                )}

                                <div className="cursor-pointer" onClick={() => onIconClick('c')}>
                                    <p className="p-2 flex border-2 border-zinc-900 rounded">
                                        <CartSolid />
                                    </p>
                                    {cartData?.length > 0 && (
                                        <div className="bg-blue-600 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center absolute top-2 ml-6">
                                            <p>{cartData.length}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </nav>
                        {checkPage()}
                    </header>
                )}

                {/* CONTENT */}
                <main className="min-h-screen w-full">{children}</main>

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