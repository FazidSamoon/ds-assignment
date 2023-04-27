/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Dashboard from '../dashboard';
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import Axios from 'axios';
import { fetchError } from '@/components/Common';
import { View } from '@/utils/iconData';
import { RadioButton } from 'primereact/radiobutton';
import { UpdateOrder } from '../api/Order';

export default function Delivery() {
    const [userData, setUserData] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [userOrders, setUserOrders] = useState();
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [address, setAddress] = useState();
    const [selectedOrder, setSelectedOrder] = useState();

    const categories = [
        { name: 'Pending', key: 'P' },
        { name: 'Shipped', key: 'S' },
        { name: 'Deliverd', key: 'D' },
        { name: 'Returned', key: 'R' },
        { name: 'Cancelled', key: 'C' }
    ];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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
            setUserOrders(orderHistory.filter((order) => order?.sellerID == userData?._id));
        }
    }, [orderHistory, userData]);

    const handleView = async (data) => {
        setVisible(true);
        setAddress(data);

        setTimeout(() => {
            console.log(address);
        }, 2000);
    };

    const stateHandle = (rowData) => {
        setVisible2(true);
        setSelectedOrder(rowData);
    };

    const submitStatus = () => {
        let orderData = selectedOrder;
        orderData.status = selectedCategory.name;
        let orderId = selectedOrder._id;
        let accessToken = JSON.parse(localStorage.getItem('access_token'));

        setVisible2(false);

        UpdateOrder(orderId, orderData, accessToken);
    };

    return (
        <Dashboard title="Dashboard Delivery">
            <div className="min-h-screen w-4/5 mx-auto items-center">
                <h1 className="text-xl font-semibold text-center my-8 p-4 rounded-lg text-zinc-800 bg-white">DELIVERY STATUS</h1>

                <div className="bg-white p-8 rounded-lg">
                    <div className="my-8 mx-12">
                        <div className="card">
                            <DataTable value={userOrders} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                                <Column field="createdAt" header="Placed On" sortable></Column>
                                <Column header="Total" body={(rowData) => `LKR: ${rowData.amount}`} sortable></Column>
                                <Column
                                    header="Status"
                                    body={(rowData) => (
                                        <div onClick={() => stateHandle(rowData)}>
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
                                    header="Address"
                                    body={(rowData) => (
                                        <button className=" bg-green-600 rounded-lg text-white px-3 py-2" onClick={() => handleView(rowData.address)}>
                                            <View />
                                        </button>
                                    )}
                                ></Column>
                            </DataTable>

                            <Dialog header="Order Address" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                                <div className="mt-4">
                                    <div className="flex justify-between mb-1">
                                        <h1 className="font-medium">Full Name</h1>
                                        <h1>{address?.fullName}</h1>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <h1 className="font-medium">Address</h1>
                                        <h1>{address?.address}</h1>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <h1 className="font-medium">Phone Number</h1>
                                        <h1>{address?.phoneNumber}</h1>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <h1 className="font-medium">Country</h1>
                                        <h1>{address?.country}</h1>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <h1 className="font-medium">State</h1>
                                        <h1>{address?.state}</h1>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <h1 className="font-medium">City</h1>
                                        <h1>{address?.city}</h1>
                                    </div>
                                    {address?.companyName && (
                                        <div className="flex justify-between mb-1">
                                            <h1 className="font-medium">Company Name</h1>
                                            <h1>{address.companyName}</h1>
                                        </div>
                                    )}
                                    <div className="flex justify-between mb-1">
                                        <h1 className="font-medium">Postal Code</h1>
                                        <h1>{address?.postalCode}</h1>
                                    </div>
                                </div>
                            </Dialog>

                            <Dialog header="Order Status" visible={visible2} style={{ width: '50vw' }} onHide={() => setVisible2(false)}>
                                <div className="flex justify-center">
                                    <div className="flex mt-4 gap-3">
                                        {categories.map((category) => {
                                            return (
                                                <div key={category.key} className="flex items-center">
                                                    <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => setSelectedCategory(e.value)} checked={selectedCategory.key === category.key} />
                                                    <label htmlFor={category.key} className="ml-2">
                                                        {category.name}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <button onClick={() => submitStatus()}>Submit</button>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
