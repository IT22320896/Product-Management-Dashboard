import React from "react";
import { Route, Routes } from "react-router-dom";
import addProducts from "./pages/addProducts";
import editProduct from "./pages/editProduct";
import products from "./pages/products";


const App = () => {
  return (
    <Routes>
      <Route path='/products' element={<addProducts/>}/>
      <Route path='/products/add' element={<editProduct/>}/>
      <Route path='/products/edit' element={<editProduct/>}/>
    </Routes>
  );
};

export default App;
