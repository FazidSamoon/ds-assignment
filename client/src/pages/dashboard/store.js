import React, { useState } from 'react';
import Dashboard from '../dashboard';
import { Add, Reload } from '@/utils/iconData';
import Create from './create';
import Retrieve from './retrieve';
import Update from './update';

export default function Store() {
    const [productInfo, setProductInfo] = useState([]);
    const [view, setView] = useState('retrieve');

    return (
        <Dashboard title="Dashboard Store">
            <div className="min-h-screen w-4/5 mx-auto items-center">
                <div className="flex justify-between text-center my-8 py-3 px-8 rounded-lg text-zinc-800 bg-white">
                    <h1 className="text-xl font-semibold my-auto">PRODUCT STORE</h1>
                    <div className="flex gap-2">
                        <button className="flex gap-2 bg-zinc-800 text-white rounded-lg p-3 items-center" onClick={() => window.location.reload()}>
                            <Reload />
                        </button>
                        <button className="flex gap-2 bg-zinc-800 text-white rounded-lg p-3 items-center" onClick={() => setView('create')}>
                            <Add />
                            Add Product
                        </button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg">
                    {view == 'retrieve' && <Retrieve setView={setView} setProductInfo={setProductInfo} />}
                    {view == 'create' && <Create />}
                    {view == 'update' && <Update setView={setView} productInfo={productInfo} />}
                </div>
            </div>
        </Dashboard>
    );
}
