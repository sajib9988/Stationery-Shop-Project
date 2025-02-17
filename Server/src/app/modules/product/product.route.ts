import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/add-product", ProductController.addProduct); // Add new product
router.get("/", ProductController.getAllProducts); // Get all products with filters
router.get("/:id", ProductController.getProductById); // Get product by ID
router.put("/update-product/:id", ProductController.updateProduct); // Update product
router.delete("/:id", ProductController.deleteProduct); // Delete product

export const ProductRoutes = router;
