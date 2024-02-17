import { useEffect, useState } from "react";
import ShoppingCart from "./ShoppingCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
export default function Sales({ products, categories }) {
  const [search, setSearch] = useState("");
  const [addToCart, setAddToCart] = useState([]);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [productDetail, setProductDetail] = useState({});

  const openModal = (product) => {
    const existingItem = addToCart.find((item) => item.id === product.id);
    setProductDetail({ ...product, quantity: existingItem ? existingItem.quantity : 1 });
    setShowProductDetail(true);
  };

  const closeModal = () => {
    setShowProductDetail(false);
  };

  const updateProductPrice = (newPrice) => {
    setProductDetail((prevProduct) => ({ ...prevProduct, price: newPrice }));
    setAddToCart((prevCart) => prevCart.map((item) => (item.id === productDetail.id ? { ...item, price: newPrice } : item)));
  };

  const updateProductQuantities = (newQty) => {
    setProductDetail((prevProduct) => ({ ...prevProduct, quantity: newQty }));
    setAddToCart((prevCart) => prevCart.map((item) => (item.id === productDetail.id ? { ...item, quantity: newQty } : item)));
  };
  const updatedCartQuantities = (updatedQuantities) => {
    setAddToCart(updatedQuantities);
  };

  useEffect(() => {
    setAddToCart(JSON.parse(localStorage.getItem("addToCart")) || []);
  }, []);
  function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }, { maximumFractionDigits: 0 }).format(price);
  }

  const filterProducts = (products, search) => {
    if (search.length < 3) {
      return products;
    }

    if (search === "all") {
      return products;
    }

    return products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()) || product.code.toLowerCase().includes(search.toLowerCase()) || product.category.name.toLowerCase().includes(search.toLowerCase()));
  };

  useEffect(() => {
    localStorage.setItem("addToCart", JSON.stringify(addToCart));
  });

  function toggleAddToCart(product) {
    const existingItem = addToCart.find((item) => item.id === product.id);

    if (existingItem) {
      // If the product is already in the cart, update its quantity
      const updatedCart = addToCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      setAddToCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with quantity 1
      setAddToCart([...addToCart, { ...product, quantity: 1 }]);
    }
  }

  function toggleAddToCartWithQuantity(product) {
    const existingItem = addToCart.find((item) => item.id === product.id);

    if (existingItem) {
      // If the product is already in the cart, update its quantity
      const updatedCart = addToCart.map((item) => (item.id === product.id ? { ...item, quantity: product.quantity } : item));
      setAddToCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with quantity 1
      setAddToCart([...addToCart, { ...product, quantity: product.quantity }]);
    }
  }

  return (
    <>
      <div id='content' className='max-h-full overflow-auto col-span-3'>
        <div className='grid grid-cols-3 gap-2'>
          <div className='flex items-center col-span-2 group'>
            <input type='search' placeholder='Search product...' className='py-2 px-4 rounded-l-lg w-full dark:text-slate-900' onChange={(e) => setSearch(e.target.value)} />
            <span className='py-2 px-4 rounded-r-lg border border-gray-300'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </div>
          <select name='categories' id='category-filter' className='p-2 rounded-lg w-full dark:text-slate-900' onChange={(e) => setSearch(e.target.value)}>
            <option value='all'>All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='grid grid-cols-4 gap-0 mt-5 justify-between'>
          {filterProducts(products, search).map((product) => (
            <div className='group card w-[220px] bg-slate-200 hover:shadow-lg hover:shadow-slate-400 hover:bg-slate-100 p-3 mt-3 rounded-xl cursor-pointer hover:scale-105 transition-all delay-150 duration-300 ease-in-out' key={product.id}>
              <div className='relative'>
                {/* <img src={product.image} alt='product' height={200} width={200} className='rounded-lg group-hover:scale-105 transition delay-500 duration-500 ease-in-out' /> */}
                {/* <div className='rounded-lg h-[200px] w-[200px] group bg-cover bg-center' style={{ backgroundImage: `url(${product.image})` }} aria-hidden='true'></div> */}
                <div className='rounded-lg h-[200px] w-[200px] group bg-cover bg-center' style={{ backgroundImage: `url("https://source.unsplash.com/random/300×300/?${product.category.name}")` }} aria-hidden='true'></div>
                <div className='absolute left-2 top-2'>
                  <span className='bg-white text-black px-2 py-1 rounded-lg text-xs mr-2'>Stock: {product.stock}</span>
                  <span className='bg-white text-black px-2 py-1 rounded-lg text-xs'>{product.category.name}</span>
                </div>
              </div>
              <div className='card-header'>
                <h3 className='text-xl font-bold dark:text-slate-900'>{formatPrice(product.price)}</h3>
              </div>
              <div className='card-body'>
                <small className='text-slate-600'>{product.code}</small>
                <h4 className='text-sm dark:text-slate-900'>{product.name}</h4>
              </div>
              <div className='card-footer mt-5 grid grid-cols-3 gap-1'>
                <button className='p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-600 transition-all col-span-2' onClick={() => toggleAddToCart(product)}>
                  Add to cart
                </button>
                <button className='p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-600 transition-all' onClick={() => openModal(product)}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showProductDetail} onClose={closeModal} maxWidth='2xl'>
        <div className='p-4 dark:bg-slate-100 dark:text-slate-900'>
          <div className='flex gap-5'>
            <img src={productDetail.image} alt='product-name' {...{ width: 150, height: 150 }} />
            <div className='flex flex-col justify-between'>
              <div>
                <h3 className='text-3xl font-bold'>{productDetail.name}</h3>
                <small className='text-xs text-slate-600'>
                  {productDetail.code} | Stock: {productDetail.stock}
                </small>
                <p className='text-md mb-2'>{productDetail.description}</p>
                Set Price: <input type='number' value={productDetail.price} className='p-2 rounded-lg' onChange={(e) => updateProductPrice(parseInt(e.target.value))} />
                <input type='number' value={productDetail.quantity === 0 ? 1 : productDetail.quantity} className='p-2 rounded-lg w-24 ml-1' onChange={(e) => updateProductQuantities(parseInt(e.target.value))} /> Pcs
              </div>
              <div>
                <button className='p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-600 transition-all mt-3' onClick={() => toggleAddToCartWithQuantity(productDetail)} disabled={productDetail.length > 0}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <ShoppingCart cart={addToCart} updateCartQuantities={updatedCartQuantities} updateProductPrice={updateProductPrice} />
    </>
  );
}
