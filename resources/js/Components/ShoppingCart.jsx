import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
function ShoppingCart({ cart, updateCartQuantities }) {
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
  }

  function removeQuantity(product) {
    const updatedQuantities = quantities.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item));
    setQuantities(updatedQuantities);
    updateCartQuantities(updatedQuantities);
  }

  const checkout = () => {
    // Here you would typically send a request to your server to process the order and handle payment
    setShowModal(true);
    console.log("Order processed:", cart);

    // After successful processing, you might want to reset the cart or redirect to a thank-you page
    setCart([]);
  };

  function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);
  }

  //   function checkout(checkout) {
  //     setShowModal(true);
  //   }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <div id='shopping-cart' className='bg-slate-100 h-[75%] rounded-t-xl p-5 overflow-auto'>
          <h2 className='text-2xl font-bold'>Order Summary</h2>
          {quantities.length === 0 ? (
            <div className='flex items-center justify-center h-[75%]'>
              <h3 className='text-xl font-bold text-slate-500'>
                <FontAwesomeIcon icon={faCartShopping} /> Cart is empty
              </h3>
            </div>
          ) : (
            quantities.map((item) => (
              <div id='cart-items' className='mt-5 relative' key={item.id}>
                <div className='flex mt-5 items-center justify-between gap-2 border-b pb-3'>
                  <img src={item.image} alt='product-name' className='w-[75px] h-[75px]' />
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
            ))
          )}
        </div>
        <div className='h-[25%] w-full bg-slate-200 rounded-b-xl text-slate-800 p-5'>
          {quantities.length > 0 && (
            <>
              <h3 className='text-lg font-bold'>Total: {formatPrice(total)}</h3>
              <button className='mt-5 w-full bg-slate-800 text-white p-2 rounded-lg' onClick={() => checkout(cart)}>
                Checkout
              </button>
            </>
          )}
        </div>
        <Modal show={showModal} onClose={closeModal} maxWidth='2xl'>
          <div className='p-6'>
            <h2 className='text-2xl font-bold'>Order Summary</h2>
            <p className='text-sm'>Total Items: {quantities.length}</p>
            <div className='my-2 max-h-72 overflow-auto'>
              {cart.map((item) => (
                <div key={item.id} className='flex items-center justify-between gap-2 border-b-2 border-dashed border-slate-300 p-4'>
                  <div className='flex items-center gap-2'>
                    <img src={item.image} alt='product-name' className='w-[75px] h-[75px]' />
                    <div>
                      <h3 className='text-lg font-bold'>{item.name}</h3>
                      <p className='text-sm'>{formatPrice(item.price)}</p>
                      <p className='text-sm'>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <h2 className='text-lg'>Subtotal: {formatPrice(item.price * item.quantity)}</h2>
                </div>
              ))}
            </div>
            <div className='mt-4'>
              <h3 className='text-lg font-bold'>Total: {formatPrice(total)}</h3>
            </div>
            <div className='mt-4'>
              <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={closeModal}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ShoppingCart;
