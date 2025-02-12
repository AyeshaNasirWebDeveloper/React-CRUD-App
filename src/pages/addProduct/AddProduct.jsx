import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../../Data/firebaseContext';
import Swal from 'sweetalert2';

const AddProductPage = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const { addProduct } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !image || !category) {
      if (!title) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Product Title is required!',
        });
      } else if (!price) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Product Price is required!',
        });
      } else if (!image) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Product Image URL is required!',
        });
      } else if (!category) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Product Category is required!',
        });
      }
      return;
    }

    addProduct({ title, price, image, category, date: new Date().toLocaleDateString() });
    navigate('/'); // Redirect to the product details page after adding
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="font-extrabold mb-4 text-green-500 text-center text-3xl">Add Product</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          placeholder="Product Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          placeholder="Product Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="bg-green-600 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-500 w-full text-white py-2 px-4 rounded-md transition duration-300"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProductPage;