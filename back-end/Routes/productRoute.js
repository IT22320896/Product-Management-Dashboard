import multer from "multer";
import express from "express";
import path from "path";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../Controllers/productController.js"; // Use import for the controller
import fs from "fs";

const router = express.Router();

// Ensure that the uploads directory exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create uploads folder if it doesn't exist
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
  },
});

const upload = multer({ storage });

// POST route to create a product
router.post("/addproduct", upload.single("image"), createProduct);
router.get("/products", getAllProducts);
router.delete("/products/:id", deleteProduct);
router.get("/products/:id", getProductById);
router.put("/products/:id", upload.single("image"), updateProduct);

// Export the router
export default router;
