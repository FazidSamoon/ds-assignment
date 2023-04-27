/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import PageTitle from '@/components/PageTitle';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import Axios from 'axios';
import { fetchError } from '@/components/Common';
import { View } from '@/utils/iconData';
import { getProductById } from './api/Product';
import Link from 'next/link';

export default function OrderHistory() {
    const [userData, setUserData] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [userOrders, setUserOrders] = useState();
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user_data')));
    }, []);

    useEffect(() => {
        if (userData) {
            Axios.get('http://localhost:3002/api/order/')
                .then((response) => {
                    setOrderHistory(response.data.data);
                })
                .catch((error) => {
                    fetchError(error);
                });
        } else {
            toast.error('connection error try again');
        }
    }, [userData]);

    useEffect(() => {
        if (orderHistory != null && userData != null) {
            for (let i = 0; i < orderHistory.length; i++) {
                orderHistory[i].createdAt = orderHistory[i].createdAt.slice(0, 10);
            }
            setUserOrders(orderHistory.filter((order) => order?.userID == userData?._id));
        }
    }, [orderHistory, userData]);

    const handleView = async (data) => {
        setVisible(true);
        setIsLoading(true);
        const fetchProducts = [];
        const quantity = [];
        for (let i = 0; i < data?.length; i++) {
            const product = await getProducts(data[i].productID);
            fetchProducts.push(product);
            quantity.push(data[i].quantity);
        }
        setProducts(fetchProducts);
        setQuantity(quantity);
        setIsLoading(false);
    };

    const getProducts = async (productId) => {
        const response = await getProductById(productId);
        if (response) return response.data.data;
        else toast.error('connection error try again');
    };

    return (
        <Layout title="Order History">
            <PageTitle title="ORDER HISTORY" image="/order-history.jpg" />

            <div className="my-12 mx-20">
                <div className="card">
                    <DataTable value={userOrders} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="createdAt" header="Placed On" sortable></Column>
                        <Column header="Total" body={(rowData) => `LKR: ${rowData.amount}`} sortable></Column>
                        <Column
                            header="Status"
                            body={(rowData) => (
                                <div>
                                    {rowData.status === 'Pending' && <h1 className="font-normal text-blue-600">Pending</h1>}
                                    {rowData.status === 'Shipped' && <h1 className="font-normal text-yellow-600">Shipped</h1>}
                                    {rowData.status === 'Deliverd' && <h1 className="font-normal text-green-600">Deliverd</h1>}
                                    {rowData.status === 'Returned' && <h1 className="font-normal text-orange-600">Returned</h1>}
                                    {rowData.status === 'Cancelled' && <h1 className="font-normal text-red-600">Cancelled</h1>}
                                </div>
                            )}
                            sortable
                        ></Column>
                        <Column
                            header="View"
                            body={(rowData) => (
                                <button className=" bg-green-600 rounded-lg text-white px-3 py-2" onClick={() => handleView(rowData.products)}>
                                    <View />
                                </button>
                            )}
                        ></Column>
                    </DataTable>

                    <Dialog header="Order List" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                        {isLoading ? (
                            <h1>Loading...</h1>
                        ) : (
                            <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5]} tableStyle={{ minWidth: '50rem' }}>
                                <Column
                                    header="Product"
                                    body={(rowData) => (
                                        <div className="flex items-center">
                                            <Link href={{ pathname: '/product', query: { id: rowData._id } }}>
                                                <img src={`data:image/jpeg;base64,${rowData.image}`} alt="" className="w-16 h-16 rounded-lg" />
                                            </Link>
                                        </div>
                                    )}
                                ></Column>
                                <Column field="name" header="Name" sortable></Column>
                                <Column header="Price" body={(rowData) => `LKR: ${rowData.price}`} sortable></Column>
                                <Column header="Quantity" body={(rowData, rowIndex) => `${quantity[rowIndex.rowIndex]}`}></Column>
                            </DataTable>
                        )}
                    </Dialog>
                </div>
            </div>
        </Layout>
    );
}
