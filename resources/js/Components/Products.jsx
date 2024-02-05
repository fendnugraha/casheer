import { data } from "autoprefixer";
import { useState } from "react";
import ShoppingCart from "./ShoppingCart";
export default function Products ( { products } ) {
    const [addToCart, setAddToCart] = useState([]);

    function toggleAddToCart(product) {
        const existingItem = addToCart.find(item => item.id === product.id);
    
        if (existingItem) {
            // If the product is already in the cart, update its quantity
            const updatedCart = addToCart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setAddToCart(updatedCart);
        } else {
            // If the product is not in the cart, add it with quantity 1
            setAddToCart([...addToCart, { ...product, quantity: 1 }]);
        }
    }

    return (
        <>
        <div id="content" className="bg-slate-100 max-h-full w-3/4 rounded-xl p-5 overflow-auto">
            <div className="flex justify-between gap-2">
                <h2 className="text-2xl font-bold">Products</h2>
                <input type="search" name="product" id="product-seacrh" placeholder="&#128270; Search product"
                    className="p-2 rounded-lg w-full ring-1 ring-slate-300" onChange={(e) => console.log(e.target.value)}/>
                <select name="categories" id="category-filter" className="p-2 rounded-lg w-full" onChange={(e) => console.log(e.target.value)}>
                    <option value="all">All</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="laptop">Laptop</option>
                    <option value="tablet">Tablet</option>
                </select>
            </div>
        <div className="grid grid-cols-4 gap-0 mt-5 justify-items-center">
        {products.data.map((product) => (
        <div className="card w-[200px] bg-white hover:shadow-lg p-3 mt-3 rounded-lg cursor-pointer" key={product.id}>
            <img src={product.image} alt="product" height={200} width={200}/>
            <div className="card-header">
                <h3 className="text-xl font-bold"><sup>Rp</sup>{product.price}</h3>
            </div>
            <div className="card-body">
                <small className="text-slate-600">{product.code}</small>
                <h4 className="text-sm">{product.name}</h4>
            </div>
            <div className="card-footer mt-5">
                <button className="p-2 bg-slate-600 text-white rounded-lg hover:rounded-sm transition-all" onClick={() => toggleAddToCart(product)}>Add
                    to cart</button>
            </div>
        </div>
        ))}

        </div>
        </div>
        <ShoppingCart cart={addToCart} />
        </>
    )
}