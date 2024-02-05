import React from 'react';
import NavBar from '@/Components/NavBar';
import { Head } from '@inertiajs/react';
import Paginator from '@/Components/Paginator';
import Products from '@/Components/Products';

export default function Index({ products, title }) {
    // 
    return (
        <>
            <Head title={title} />
            <NavBar/>
            <div className="container mx-auto mt-5 h-[80vh] flex gap-3 justify-center">
                <Products products={products} />
                
            </div>
        </>
    );
}
