// src/FirebaseProvider.jsx
import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import FirebaseContext from '../Data/firebaseContext';

const FirebaseProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsArray);
  };

  const addProduct = async (product) => {
    const docRef = await addDoc(collection(db, "products"), product);
    setProducts([...products, { id: docRef.id, ...product }]);
  };

  const updateProduct = async (id, updatedProduct) => {
    const productRef = doc(db, "products", id);

    const existingProduct = products.find(product => product.id === id);
    const productWithDate = { ...updatedProduct, date: existingProduct.date };

    await updateDoc(productRef, productWithDate);
    setProducts(products.map(product => product.id === id ? { id, ...productWithDate } : product));
    setEditingProduct(null);
  };

  const deleteProduct = async (id) => {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
    setProducts(products.filter(product => product.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FirebaseContext.Provider value={{
      products: filteredProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      setSearchTerm,
      editingProduct,
      setEditingProduct,
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;