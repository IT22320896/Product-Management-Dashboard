import Product from "../Models/ProductModel.js"; // Import with ES module syntax

export const createProduct = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file); // Check if the file is coming through

    const { name, price, description, category } = req.body;

    // ID generation logic
    const latestProduct = await Product.find().sort({ _id: -1 }).limit(1);
    let ID;

    if (latestProduct.length !== 0) {
      const latestId = parseInt(latestProduct[0].ID.slice(1));
      ID = "P" + String(latestId + 1).padStart(4, "0");
    } else {
      ID = "P0001";
    }

    console.log(ID);
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = new Product({
      ID,
      name,
      price,
      description,
      category,
      image: req.file.filename, // Save the local file path
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    // Check if products exist
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Return the products in the response
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { name, description, price, category } = req.body;
  const productId = req.params.id;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product details
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;

    // Handle image upload if a new image is provided
    if (req.file) {
      // Delete the old image if exists
      if (product.image && product.image[0]) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads",
          product.image[0]
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Set the new image path
      product.image = [req.file.filename];
    }

    // Save the updated product
    await product.save();
    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
