import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import path from "path";
import productRoutes from "./Routes/productRoute.js";
import cors from "cors";

const app = express();

// Connect to the MongoDB database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to db");
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(cors());

// Get the directory name in ES modules (properly handle Windows paths)
const __dirname = path.resolve(path.dirname(new URL(import.meta.url).pathname));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/product", productRoutes);
