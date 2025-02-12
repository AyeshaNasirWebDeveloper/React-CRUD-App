// src/pages/EditProductPage.jsx
import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FirebaseContext from '../../Data/firebaseContext';

const EditProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { products, updateProduct } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  const [title, setTitle] = useState(product?.title || '');
  const [price, setPrice] = useState(product?.price || '');
  const [image, setImage] = useState(product?.image || '');
  const [category, setCategory] = useState(product?.category || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(id, { title, price, image, category });
    navigate('/'); // Redirect to the product details page after updating
  };

  if (!product) return <div>Product not found</div>;

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="font-extrabold mb-4 text-orange-500 text-center text-3xl">Update Product</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="text"
          placeholder="Product Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="text"
          placeholder="Product Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none  w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-400 transition duration-300 cursor-pointer"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={() => navigate('/')} // Cancel editing
            className="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none  w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProductPage;