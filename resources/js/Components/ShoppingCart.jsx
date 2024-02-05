import { useState, useEffect } from "react";

function ShoppingCart({ cart }) {
    const [total, setTotal] = useState(0);
    const [quantities, setQuantities] = useState(cart);
    const formatNumber = (number) => new Intl.NumberFormat('id-ID').format(number);

    useEffect(() => {
        setQuantities(cart);
    }, [cart]);

    useEffect(() => {
        // Calculate the total based on quantities and prices
        const newTotal = quantities.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotal(newTotal);
    }, [quantities]);

    function addQuantity(product) {
        const updatedQuantities = quantities.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setQuantities(updatedQuantities);
    }

    function removeQuantity(product) {
        const updatedQuantities = quantities.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setQuantities(updatedQuantities);
    }

    return (
        <>
            <div id="shopping-cart" className="bg-slate-100 max-h-full w-1/4 rounded-xl p-5">
                <h2 className="text-2xl font-bold">Order Summary</h2>
                {quantities.length === 0 ? (
                    <h3 className="text-xl font-bold">Cart is empty</h3>
                ) : (
                    quantities.map((item) => (
                        <div id="cart-items" className="mt-5" key={item.id}>
                            <div className="flex mt-5 items-center justify-between gap-2 border-b pb-3">
                    <img src="https://via.placeholder.com/100" alt="product-name" className="w-[75px] h-[75px]" />
                    <div className="grow">
                        <h3 className="text-sm font-bold">{item.name}</h3>
                        <div className="flex gap-3 items-center justify-between">
                            <h3 className="text-sm">${item.price}</h3>
                        <div>
                                    <button
                                        className="mr-2 px-2 bg-white"
                                        onClick={() => removeQuantity(item)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>{" "}
                                    <span>{item.quantity}</span>{" "}
                                    <button
                                        className="ml-2 px-2 bg-white"
                                        onClick={() => addQuantity(item)}
                                        disabled={item.quantity >= 100}
                                    >
                                        +
                                    </button>
                                </div>
                        </div>
                        <h3 className="text-xs mt-2 font-bold text-slate-600">Subtotal: ${item.price * item.quantity}</h3>
                    </div>
                </div>
                </div>
                
                    ))
                    
                )}
                {quantities.length > 0 && (
                    <div className="mt-5">
                        <h3 className="text-lg font-bold">Total: <sup>Rp</sup> {formatNumber(total)}</h3>
                        <button className="mt-5 w-full bg-slate-800 text-white p-2 rounded-lg" >Checkout</button>
                    </div>

                )}
            </div>
        </>
    );
}

export default ShoppingCart;
