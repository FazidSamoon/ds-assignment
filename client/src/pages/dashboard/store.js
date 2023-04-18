import React from 'react';
import Dashboard from '../dashboard';
import { Add } from '@/utils/iconData';

export default function Store() {
    return (
        <Dashboard title="Dashboard Store">
            <div className="min-h-screen w-4/5 mx-auto items-center">
                <h1 className="flex justify-between text-center my-8 py-4 px-8 rounded-lg text-zinc-800 bg-white">
                    <h1 className="text-3xl font-semibold">PRODUCT STORE</h1>
                    <button className="flex gap-2 bg-zinc-800 text-white rounded-lg font-medium py-2 px-4 items-center">
                        <Add />
                        ADD PRODUCT
                    </button>
                </h1>

                <div className="bg-white p-8 rounded-lg"></div>
            </div>
        </Dashboard>
    );
}
