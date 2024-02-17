import Paginator from "./Paginator";

export default function Products({ products }) {
  console.log(products);
  const formatPrice = (price) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);
  return (
    <>
      <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
        <thead>
          <tr>
            <th className='px-6 py-3 text-start font-medium text-gray-500 uppercase'>ID</th>
            <th className='px-6 py-3 text-start font-medium text-gray-500 uppercase'>Product Name</th>
            <th className='px-6 py-3 text-start font-medium text-gray-500 uppercase'>Stock</th>
            <th className='px-6 py-3 text-start font-medium text-gray-500 uppercase'>SKU</th>
            <th className='px-6 py-3 text-start font-medium text-gray-500 uppercase'>Category</th>
            <th className='px-6 py-3 text-start font-medium text-gray-500 uppercase'>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.data.map((product) => (
            <tr key={product.id} className='border-b border-gray-200 dark:border-gray-700'>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>{product.id}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 align-middle flex items-center gap-2'>
                <img src={product.image} alt='' height={50} width={50} className='rounded-md' />
                <div>
                  {product.name}
                  <small className='text-gray-500 text-xs block'>{product.description.substring(0, 80)}...</small>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>{product.stock}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>{product.code}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>{product.category.name}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>{formatPrice(product.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator links={products} />
    </>
  );
}
