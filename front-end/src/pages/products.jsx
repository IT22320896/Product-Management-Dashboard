import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../components/Toast/Toast";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import { Input, Button } from "@material-tailwind/react";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5555/product/products"
      );
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Toast("Error fetching products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5555/product/products/${productId}`
          );
          Toast("Product deleted successfully!", "success");
          fetchProducts();
        } catch (error) {
          console.error("Error deleting product:", error);
          Toast("Error deleting product", "error");
        }
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto px-4">
      {/* Search and Add Product Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-8">
        <div className="relative w-full md:w-96 ml-80 ">
          <Input
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 pr-10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        <Button
          className="flex items-center gap-2 bg-blue-500 normal-case"
          onClick={() => navigate("/products/add")}
        >
          <FaPlus size={16} />
          Add New Product
        </Button>
      </div>

      {/* Products Grid */}
      <section
        id="Products"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <div>
              <img
                src={product.image[0]}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.name}
                </p>
                <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-sm text-gray-600 cursor-auto">
                  {product.category}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    RS. {product.price}
                  </p>
                  <div className="ml-auto flex gap-2">
                    <button
                      onClick={() => navigate(`/products/edit/${product._id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* No Results Message */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
};

export default Products;
