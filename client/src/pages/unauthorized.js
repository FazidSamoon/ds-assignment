/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react';

export default function Unauthorized() {
    const router = useRouter();

    setTimeout(() => {
        router.push('/');
    }, 5000);

    return (
        <div className="min-h-screen">
            <h1 className="uppercase text-center font-medium text-3xl p-6 mx-20 text-zinc-800">user unauthorized to access requested resource</h1>
            <div className="w-screen bg-white flex justify-center mx-auto">
                <img src="/unauthorized.jpg" alt="unauthorized" width="40%" />
            </div>
        </div>
    );
}
