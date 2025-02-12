import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirebaseProvider from './Data/firebaseProvider';
import ProductDetails from './pages/home/home';
import AddProduct from './pages/addProduct/AddProduct';
import EditProduct from './pages/editProduct/EditProduct';

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Routes>
              <Route path="/" element={<ProductDetails />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/editproduct/:id" element={<EditProduct />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FirebaseProvider>
  );
}

export default App;