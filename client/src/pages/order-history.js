import Layout from '@/components/Layout';
import PageTitle from '@/components/PageTitle';
import React, { useEffect, useState } from 'react';
import { getOrderById } from './api/Order';
import { toast } from 'react-toastify';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';

export default function OrderHistory() {
    const [userData, setUserData] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user_data')));
    }, []);

    useEffect(() => {
        if (userData._id) {
            const response = getOrderById(userData._id);
            setOrderHistory(response);
        } else {
            toast.error('connection error try again');
        }
    }, [userData]);

    //Sample
    const [nodes, setNodes] = useState([]);
    useEffect(() => {
        let files = [];

        for (let i = 0; i < 50; i++) {
            let node = {
                key: i,
                data: {
                    name: 'Item ' + i,
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + i
                },
                children: [
                    {
                        key: i + ' - 0',
                        data: {
                            name: 'Item ' + i + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'Type ' + i
                        }
                    }
                ]
            };

            files.push(node);
        }

        setNodes(files);
    }, []);

    console.log(nodes);

    return (
        <Layout title="Order History">
            <PageTitle title="ORDER HISTORY" image="/order-history.jpg" />

            <div className="my-12 mx-20">
                <div className="card">
                    <TreeTable value={nodes} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="Name" expander></Column>
                        <Column field="size" header="Size"></Column>
                        <Column field="type" header="Type"></Column>
                    </TreeTable>
                </div>
            </div>
        </Layout>
    );
}
