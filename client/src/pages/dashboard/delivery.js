import React, { useEffect, useState } from 'react';
import Dashboard from '../dashboard';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';

export default function Delivery() {
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
        <Dashboard title="Dashboard Delivery">
            <div className="min-h-screen w-4/5 mx-auto items-center">
                <h1 className="text-xl font-semibold text-center my-8 p-4 rounded-lg text-zinc-800 bg-white">DELIVERY STATUS</h1>

                <div className="bg-white p-8 rounded-lg">
                    <div className="card">
                        <TreeTable value={nodes} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="name" header="Name" expander></Column>
                            <Column field="size" header="Size"></Column>
                            <Column field="type" header="Type"></Column>
                        </TreeTable>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
