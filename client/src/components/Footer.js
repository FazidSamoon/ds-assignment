import { Facebook, Instagram, Twitter, Whatsapp } from '@/utils/iconData';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function Footer() {
    const router = useRouter();

    // onClick={() => {
    //     router.push('https://www.google.com/');
    // }}

    return (
        <>
            <div className="mt-12">
                <div className="grid grid-cols-3 gap-24 mb-12">
                    <div className="text-end border-r-2 pr-24 border-zinc-800 text-zinc-800">
                        <h1 className="footer-head">Contact Us</h1>
                        <h1 className="font-medium mt-4">Email</h1>
                        <h1>lakinduvirajith@gmail.com</h1>
                        <h1 className="font-medium mt-4">Phone</h1>
                        <h1>077 278 0771</h1>
                        <h1 className="font-medium mt-4">Address</h1>
                        <h1>N0.30 Robert De Zoysa Road</h1>
                    </div>
                    <div className="text-center text">
                        <h1 className="footer-head">VP STORES</h1>
                        <h1 className="mt-4">Experience the convenience of ordering food online with our easy-to-use app</h1>
                        <div className="flex h-8 gap-6 mt-4 justify-center">
                            <Instagram />
                            <Facebook />
                            <Whatsapp />
                            <Twitter />
                        </div>
                    </div>
                    <div className="text-start border-l-2 pl-24 border-zinc-800">
                        <h1 className="footer-head">Utility Pages</h1>
                        <div className="flex flex-col mt-4 font-medium text-zinc-800 gap-y-4">
                            <Link href={'/'}>Home Page</Link>
                            <Link href={'/shop'}>Shop Page</Link>
                            <Link href={'/about'}>About Page</Link>
                            <Link href={'/contact'}>Contact Page</Link>
                        </div>
                    </div>
                </div>
                <p className="text-center border-t-2 py-4 mx-24 border-zinc-800">
                    Copyright © 2022 <strong className="font-medium">VP STORES</strong>
                </p>
            </div>
        </>
    );
}
