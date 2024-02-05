import { useState, useEffect } from "react";

function ShoppingCart({ cart }) {
    const [total, setTotal] = useState(0);
    const [quantities, setQuantities] = useState(cart);
    const checkoutUrl = "https://api.whatsapp.com/send?phone=0881022122200&text=Hello%20World%20from%20React";
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

    const checkout = () => {
        // Here you would typically send a request to your server to process the order and handle payment
        console.log("Order processed:", cart);
        // After successful processing, you might want to reset the cart or redirect to a thank-you page
        // setCart([]);
    };

    return (
        <>
            <div id="shopping-cart" className="bg-slate-100 max-h-full w-1/4 rounded-xl p-5 relative overflow-auto">
                <h2 className="text-2xl font-bold">Order Summary</h2>
                {quantities.length === 0 ? (
                    <h3 className="text-xl font-bold">Cart is empty</h3>
                ) : (
                    quantities.map((item) => (
                        <div id="cart-items" className="mt-5" key={item.id}>
                            <div className="flex mt-5 items-center justify-between gap-2 border-b pb-3">
                    <img src={item.image} alt="product-name" className="w-[75px] h-[75px]" />
                    <div className="grow">
                        <h3 className="text-sm font-bold">{item.name}</h3>
                        <div className="flex gap-3 items-center justify-between">
                            <h3 className="text-sm">${formatNumber(item.price)}</h3>
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
                        <h3 className="text-xs mt-2 font-bold text-slate-600">Subtotal: ${formatNumber(item.price * item.quantity)}</h3>
                    </div>
                </div>
                </div>
                
                    ))
                    
                )}
                {quantities.length > 0 && (
                    <div className="mt-5 absolute bottom-0 left-0 w-full bg-slate-200 rounded-b-xl text-slate-800 p-5">
                        <h3 className="text-lg font-bold">Total: <sup>Rp</sup> {formatNumber(total)}</h3>
                        <button className="mt-5 w-full bg-slate-800 text-white p-2 rounded-lg" onClick={checkout}>Checkout</button>
                    </div>

                )}
            </div>
        </>
    );
}

export default ShoppingCart;
