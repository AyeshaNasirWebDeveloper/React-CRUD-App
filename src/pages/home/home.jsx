
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from "../../Data/firebaseContext";

const ProductDetailsPage = () => {
  const { products, deleteProduct, setSearchTerm } = useContext(FirebaseContext);

  return (

    <div className="space-y-4 w-full m-auto p-4">
      <h1 className="text-center text-2xl md:text-4xl font-extrabold text-indigo-800 mb-8">
        Product Details
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between mb-4">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link
          to="/addproduct"
          className="w-full md:w-40 text-center py-2 rounded-xl bg-indigo-800 text-white text-lg hover:bg-indigo-600 transition duration-300"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg text-center">
          <thead>
            <tr>
              <th className="px-2 py-2 text-sm md:text-base">S.NO.</th>
              <th className="px-2 py-2 text-sm md:text-base">PRODUCT IMAGE</th>
              <th className="px-2 py-2 text-sm md:text-base">PRODUCT NAME</th>
              <th className="px-2 py-2 text-sm md:text-base">PRICE</th>
              <th className="px-2 py-2 text-sm md:text-base">CATEGORY</th>
              <th className="px-2 py-2 text-sm md:text-base">DATE</th>
              <th className="px-2 py-2 text-sm md:text-base">ACTION</th>
              <th className="px-2 py-2 text-sm md:text-base">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b border-gray-200">
                <td className="px-2 py-2 text-sm md:text-base">{index + 1}</td>
                <td className="px-2 py-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 md:w-16 md:h-16 object-cover mx-auto"
                  />
                </td>
                <td className="px-2 py-2 text-sm md:text-base">{product.title}</td>
                <td className="px-2 py-2 text-sm md:text-base">{product.price}</td>
                <td className="px-2 py-2 text-sm md:text-base">{product.category}</td>
                <td className="px-2 py-2 text-sm md:text-base">{product.date}</td>
                <td className="px-2 py-2 space-x-2">
                  <Link
                    to={`/editproduct/${product.id}`}
                    className="bg-yellow-600 text-white py-1 px-2 md:px-3 rounded-md hover:bg-yellow-500 transition duration-300 text-sm md:text-base"
                  >
                    Edit
                  </Link>
                </td>
                <td className="px-2 py-2 space-x-2">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-600 text-white py-1 px-2 md:px-3 rounded-md hover:bg-red-500 transition duration-300 cursor-pointer text-sm md:text-base"
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetailsPage;