import React, { useEffect, useState } from 'react';
import Dashboard from '../dashboard';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Form } from '@/utils/iconData';

export default function Orders() {
    //Sample
    const [nodes, setNodes] = useState([]);
    useEffect(() => {
        let files = [];

        for (let i = 0; i < 10; i++) {
            let node = {
                orderId: `oreder${i}`,
                amount: Math.floor(Math.random() * 1000),
                status: 'Pending',
                address: 'Button'
            };

            files.push(node);
        }

        setNodes(files);
    }, []);

    console.log(nodes);

    //Sample Address
    const [visible, setVisible] = useState(false);

    return (
        <Dashboard title="Dashboard Orders">
            <div className="min-h-screen w-4/5 mx-auto items-center">
                <h1 className="text-xl font-semibold text-center my-8 p-4 rounded-lg text-zinc-800 bg-white">ORDER SUMMARY</h1>

                <div className="bg-white p-8 rounded-lg">
                    <div className="card">
                        <DataTable value={nodes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="orderId" header="order ID"></Column>
                            <Column field="amount" header="Amount"></Column>
                            <Column field="status" header="Status"></Column>
                            <Column
                                field="address"
                                header="Address"
                                body={(rowData) => (
                                    <div className="card flex justify-content-center">
                                        <div className="flex gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg">
                                            <Form />
                                            <button type="button" onClick={() => setVisible(true)} className="font-medium">
                                                show
                                            </button>
                                        </div>

                                        <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                                            <p className="m-0">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim id est laborum.
                                            </p>
                                        </Dialog>
                                    </div>
                                )}
                            ></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
