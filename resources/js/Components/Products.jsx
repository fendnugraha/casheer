import { useEffect, useState } from "react";
import ShoppingCart from "./ShoppingCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function Products({ products, categories }) {
  const [search, setSearch] = useState("");

  const [addToCart, setAddToCart] = useState([]);
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

    return products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()) || product.code.toLowerCase().includes(search.toLowerCase()) || product.category_id.toLowerCase().includes(search.toLowerCase()));
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

  return (
    <>
      <div id='content' className='max-h-full overflow-auto col-span-3'>
        <div className='grid grid-cols-3 gap-2'>
          <div className='flex items-center col-span-2'>
            <input type='search' placeholder='Search...' className='py-2 px-4 border border-gray-300 rounded-l-lg w-full' onChange={(e) => setSearch(e.target.value)} />
            <span className='bg-blue-500 text-white py-2 px-4 rounded-r-lg '>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </div>
          <select name='categories' id='category-filter' className='p-2 rounded-lg w-full' onChange={(e) => setSearch(e.target.value)}>
            <option value='all'>All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='grid grid-cols-4 gap-0 mt-5 justify-between'>
          {filterProducts(products, search).map((product) => (
            <div className='card w-[220px] bg-slate-200 hover:shadow-lg hover:shadow-slate-400 hover:bg-slate-100 p-3 mt-3 rounded-xl cursor-pointer hover:scale-105 transition-all delay-150 duration-300 ease-in-out' key={product.id}>
              <div className='relative'>
                <img src={product.image} alt='product' height={200} width={200} className='rounded-lg' />
                <div className='absolute left-2 top-2'>
                  <span className='bg-white text-black px-2 py-1 rounded-lg text-xs mr-2'>Stock: {product.stock}</span>
                  <span className='bg-white text-black px-2 py-1 rounded-lg text-xs'>{product.category.name}</span>
                </div>
              </div>
              <div className='card-header'>
                <h3 className='text-xl font-bold'>{formatPrice(product.price)}</h3>
              </div>
              <div className='card-body'>
                <small className='text-slate-600'>{product.code}</small>
                <h4 className='text-sm'>{product.name}</h4>
              </div>
              <div className='card-footer mt-5'>
                <button className='p-2 bg-slate-600 text-white rounded-lg hover:rounded-sm transition-all' onClick={() => toggleAddToCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ShoppingCart cart={addToCart} updateCartQuantities={updatedCartQuantities} />
    </>
  );
}
