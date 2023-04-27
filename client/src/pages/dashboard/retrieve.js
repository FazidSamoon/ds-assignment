/* eslint-disable @next/next/no-img-element */
import { fetchError } from '@/components/Common';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Delete, Edit } from '@/utils/iconData';
import { deleteProduct } from '../api/Product';
import { useRouter } from 'next/router';

export default function Retrieve(props) {
    const [products, setProducts] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        const userId = userData._id;
        Axios.get(`http://localhost:3001/api/product/?seller=${userId}`)
            .then((response) => {
                setProducts(response.data.data);
                setTotalRecords(response.data.data.length);
            })
            .catch((error) => {
                fetchError(error);
            });
    }, []);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const handleEdit = (rowData) => {
        props.setView('update');
        props.setProductInfo(rowData);
    };

    const handleDelete = (rowData) => {
        if (confirm('Are you sure you want to delete this product?')) {
            const productId = rowData._id;
            const accessToken = JSON.parse(localStorage.getItem('access_token'));
            deleteProduct(productId, accessToken);
        }
    };

    return (
        <div>
            <div className="card">
                <DataTable value={products.slice(first, first + rows)} rows={rows} totalRecords={totalRecords} onPage={onPageChange}>
                    <Column header="Image" body={(rowData) => <img src={`data:image/jpeg;base64,${rowData.image}`} alt="product image" width="100" height="100" />} />
                    <Column field="name" header="Name" sortable />
                    <Column field="category" header="Category" sortable />
                    <Column field="price" header="Price" body={(rowData) => `LKR: ${rowData.price}`} sortable />
                    <Column
                        header="Update"
                        body={(rowData) => (
                            <button className=" bg-blue-600 rounded-lg text-white px-3 py-2" onClick={() => handleEdit(rowData)}>
                                <Edit />
                            </button>
                        )}
                    />
                    <Column
                        header="Delete"
                        body={(rowData) => (
                            <button className=" bg-red-600 rounded-lg text-white px-3 py-2" onClick={() => handleDelete(rowData)}>
                                <Delete />
                            </button>
                        )}
                    />
                </DataTable>
                <Paginator first={first} rows={rows} totalRecords={totalRecords} onPageChange={onPageChange} rowsPerPageOptions={[5, 10]} template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" />
            </div>
        </div>
    );
}
