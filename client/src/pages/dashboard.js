import { Edit, Home, LogOut, Store } from '@/utils/iconData';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({ title, children }) {
    const router = useRouter();

    const LogoutHandle = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');

        router.push('/login');
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        if (userData?.role != 'SELLER' || userData?.role == undefined) router.push('/unauthorized');
    }, [router]);

    return (
        <>
            <Head>
                <title>{title ? title + ' - VP STORES' : 'VP STORES'}</title>
                <meta name="description" content="Ecommerce Website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ToastContainer position="bottom-center" limit={1} className="text-center" />

            <div className="grid grid-cols-5 min-h-screen w-screen">
                <div className="col-span-1 bg-zinc-100">
                    <h1 className="text-center text-xl font-medium border-4 mx-8 rounded-lg p-4 border-zinc-800 text-zinc-800 mt-8">VP STORES</h1>
                    <div className="px-8 mt-8 text-sm">
                        <Link href={'/dashboard/profile'} className="flex dashboard-head">
                            <Edit />
                            <h1 className="ml-3 mt-0.5 font-medium">PROFILE</h1>
                        </Link>

                        <Link href={'/dashboard/store'} className="flex dashboard-head">
                            <Store />
                            <h1 className="ml-3 mt-0.5 font-medium">STORE</h1>
                        </Link>

                        <Link href={'/'} className="flex dashboard-head">
                            <Home />
                            <h1 className="ml-3 mt-0.5 font-medium">USER VIEW</h1>
                        </Link>

                        <div className="flex dashboard-head dashboard-head-config absolute bottom-8" onClick={LogoutHandle}>
                            <LogOut />
                            <h1 className="ml-3 mt-0.5 font-medium">LOGOUT</h1>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="col-span-4 bg-zinc-800">{children}</div>
            </div>
        </>
    );
}
