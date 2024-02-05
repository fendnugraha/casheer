import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import ShoppingCart from "./ShoppingCart";
import { formatNumber } from "./NumberUtils";
export default function Products({ products }) {
  console.log(products);
  const [productsData, setProductsData] = useState(products);
  const [search, setSearch] = useState("");

  const [addToCart, setAddToCart] = useState([]);
  const updatedCartQuantities = (updatedQuantities) => {
    setAddToCart(updatedQuantities);
  };
  function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);
  }

  const filterProducts = (products, search) => {
    if (search.length < 3) {
      return products;
    }

    return products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()) || product.code.toLowerCase().includes(search.toLowerCase()));
  };

  //   useEffect(() => {
  //     setProductsData(filterProducts(products, search));
  //   }, [search]);

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
        <div className='flex justify-between gap-2'>
          <h2 className='text-2xl font-bold'>Products</h2>
          <input type='search' name='product' id='product-search' placeholder='&#128270; Search product' className='p-2 rounded-lg w-full ring-1 ring-slate-300' onChange={(e) => setSearch(e.target.value)} />
          <select name='categories' id='category-filter' className='p-2 rounded-lg w-full' onChange={(e) => console.log(e.target.value)}>
            <option value='all'>All</option>
            <option value='smartphone'>Smartphone</option>
            <option value='laptop'>Laptop</option>
            <option value='tablet'>Tablet</option>
          </select>
        </div>
        <div className='grid grid-cols-4 gap-0 mt-5 justify-between'>
          {filterProducts(products, search).map((product) => (
            <div className='card w-[220px] bg-white hover:shadow-lg p-3 mt-3 rounded-lg cursor-pointer border-[1px]' key={product.id}>
              <div className='relative'>
                <img src={product.image} alt='product' height={200} width={200} />
                <div className='absolute left-2 top-2'>
                  <span className='bg-white text-black px-2 py-1 rounded-lg text-xs'>Stock: {product.stock}</span>
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
