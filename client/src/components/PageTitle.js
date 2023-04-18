import React from 'react';

export default function PageTitle(props) {
    return (
        <div className="bg-fixed bg-cover bg-top h-80" style={{ backgroundImage: `url('${props.image}')` }}>
            <div className="flex justify-center items-center h-full mx-20">
                <h1 className="text-4xl font-bold text-zinc-900">{props.title}</h1>
            </div>
        </div>
    );
}
