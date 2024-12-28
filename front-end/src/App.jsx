import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProducts from "./pages/addProducts";
import EditProduct from "./pages/editProduct";
import Products from "./pages/products";

const App = () => {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/products/add" element={<AddProducts />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
    </Routes>
  );
};

export default App;
