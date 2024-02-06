import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRotate, faTrash, faCartShopping, faMinus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
function ShoppingCart({ cart, updateCartQuantities, updateProductPrice }) {
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState(cart);
  const checkoutUrl = "https://api.whatsapp.com/send?phone=0881022122200&text=Hello%20World%20from%20React";
  const formatNumber = (number) => new Intl.NumberFormat("id-ID").format(number);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setQuantities(cart);
  }, [cart]);

  useEffect(() => {
    // Calculate the total based on quantities and prices
    const newTotal = quantities.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotal(newTotal);
  }, [quantities]);

  function addQuantity(product) {
    const updatedQuantities = quantities.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    setQuantities(updatedQuantities);
    updateCartQuantities(updatedQuantities);
    updateProductPrice(product.price);
  }

  function removeQuantity(product) {
    const updatedQuantities = quantities.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item));
    setQuantities(updatedQuantities);
    updateCartQuantities(updatedQuantities);
    updateProductPrice(product.price);
  }

  const checkout = () => {
    // Here you would typically send a request to your server to process the order and handle payment
    setShowModal(true);
    console.log("Order processed:", cart);

    // After successful processing, you might want to reset the cart or redirect to a thank-you page
    setCart([]);
  };

  function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }, { maximumFractionDigits: 0 }).format(price);
  }

  function removeFromCart(product) {
    const updatedCart = quantities.filter((item) => item.id !== product.id);
    setQuantities(updatedCart);
    updateCartQuantities(updatedCart);
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const clearCart = () => {
    setQuantities([]);
    updateCartQuantities([]);
  };

  return (
    <div className='flex flex-col items-center h-[80vh]'>
      <div className='bg-slate-100 h-[75%] w-full rounded-t-xl p-5 overflow-auto'>
        <div id='shopping-cart'>
          {quantities.length === 0 ? (
            <h3 className='text-2xl font-bold text-slate-500'>
              <FontAwesomeIcon icon={faCartShopping} /> Cart is empty
            </h3>
          ) : (
            <h2 className='text-2xl font-bold'>Order Summary</h2>
          )}
          {quantities.map((item) => (
            <div id='cart-items' className='mt-5' key={item.id}>
              <div className='flex mt-5 items-center justify-between gap-2 border-b pb-3'>
                <div className='relative'>
                  <img src={item.image} alt='product-name' className='w-[75px] h-[75px] rounded-lg' />
                  <button className='absolute -top-2 -left-2 bg-white p-2 h-6 w-6 rounded-full flex items-center justify-center scale-75 hover:scale-100 hover:bg-red-400 hover:text-white transition ease-in-out'>
                    <FontAwesomeIcon icon={faMinus} onClick={() => removeFromCart(item)} />
                  </button>
                </div>
                <div className='grow'>
                  <h3 className='text-sm font-bold'>{item.name}</h3>
                  <h3 className='text-sm'>{formatPrice(item.price)}</h3>
                  <div className='flex gap-3 items-center justify-between'>
                    <h3 className='text-sm text-slate-600'>Qty</h3>
                    <div>
                      <button className='mr-2 px-2 bg-white' onClick={() => removeQuantity(item)} disabled={item.quantity <= 1}>
                        -
                      </button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <button className='ml-2 px-2 bg-white' onClick={() => addQuantity(item)} disabled={item.quantity >= 100}>
                        +
                      </button>
                    </div>
                  </div>
                  <h3 className='text-xs mt-2 font-bold text-slate-600'>Subtotal: {formatPrice(item.price * item.quantity)}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={showModal} onClose={closeModal} maxWidth='2xl'>
          <div className='p-6'>
            <h2 className='text-2xl font-bold'>Order Summary</h2>
            <p className='text-sm'>Total Items: {quantities.length}</p>
            <div className='my-2 max-h-72 overflow-auto'>
              {cart.map((item) => (
                <div key={item.id} className='flex items-center justify-between gap-2 border-b-2 border-dashed border-slate-300 p-4'>
                  <div className='flex items-center gap-2'>
                    <img src={item.image} alt='product-name' className='w-[75px] h-[75px] rounded-lg' />
                    <div>
                      <h3 className='text-lg font-bold'>{item.name}</h3>
                      <p className='text-sm'>{formatPrice(item.price)}</p>
                      <p className='text-sm'>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className='text-end'>
                    <h2 className='text-xs'>Subtotal</h2>
                    <h2 className='text-lg'>{formatPrice(item.price * item.quantity)}</h2>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-4'>
              <h3 className='text-lg font-bold'>Total: {formatPrice(total)}</h3>
            </div>
            <div className='mt-4'>
              <button className='bg-slate-800 text-white p-2 rounded-lg font-bold py-2 px-4' onClick={closeModal}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div className='h-[25%] w-full bg-slate-200 rounded-b-xl text-slate-800 p-5'>
        {quantities.length > 0 && (
          <>
            <h4>Total Payment</h4>
            <div className='flex justify-between'>
              <h4>({quantities.length} items)</h4>
              <h4>{formatPrice(total)}</h4>
            </div>
            <div className='grid grid-cols-3 justify-between gap-1 mt-3'>
              <button className=' bg-slate-800 text-white p-2 rounded-lg col-span-2' onClick={() => checkout(cart)}>
                Checkout
              </button>
              <button className=' bg-red-500 text-white p-2 rounded-lg' onClick={clearCart}>
                <FontAwesomeIcon icon={faRotate} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
