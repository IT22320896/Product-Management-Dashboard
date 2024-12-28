import { useState } from "react";
import { Input, Button, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast/Toast";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Error states
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Toys",
  ];

  const handleNameBlur = () => {
    if (!name.trim()) {
      setNameError("Product name is required.");
    } else {
      setNameError("");
    }
  };

  const handleDescriptionBlur = () => {
    if (!description.trim()) {
      setDescriptionError("Description is required.");
    } else {
      setDescriptionError("");
    }
  };

  const handlePriceBlur = () => {
    if (!price.trim()) {
      setPriceError("Price is required.");
    } else if (isNaN(price) || Number(price) <= 0) {
      setPriceError("Please enter a valid price.");
    } else {
      setPriceError("");
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory) {
      setCategory(selectedCategory);
      setCategoryError("");
    } else {
      setCategoryError("Category is required.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !description || !price || !category || !image) {
      Toast("Please fill all required fields.", "error");
      return;
    }

    setLoading(true);

    const formData = new FormData(); // Ensure this is an instance of FormData

    // Append form fields
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", Number(price));
    formData.append("category", category);

    // Append the image file
    formData.append("image", image);

    console.log(formData);

    try {
      await axios.post("http://localhost:5555/product/addproduct", formData);
      Toast("Product Added Successfully!", "success");
      navigate("/products");
    } catch (err) {
      console.error(err);
      Toast("Server Error!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <Input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameBlur}
              className="w-full"
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <Input
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={handlePriceBlur}
              className="w-full"
            />
            {priceError && (
              <p className="text-red-500 text-sm mt-1">{priceError}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {categoryError && (
              <p className="text-red-500 text-sm mt-1">{categoryError}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleDescriptionBlur}
              className="w-full"
            />
            {descriptionError && (
              <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <div className="mt-2 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Product preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <span className="text-gray-500">
                    Click to upload an image
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={
                loading ||
                nameError ||
                priceError ||
                categoryError ||
                descriptionError ||
                !name ||
                !price ||
                !category ||
                !description
              }
              className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                loading ||
                nameError ||
                priceError ||
                categoryError ||
                descriptionError
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
