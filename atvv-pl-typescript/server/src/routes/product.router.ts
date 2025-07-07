import express from "express";
import * as ProductController from "../controllers/product.controller";

const router = express.Router();

// GET : Get List of all products
router.get("/", ProductController.listProducts);

// GET : Get one product by ID
// Param : id
router.get("/:id", ProductController.getProduct);

// POST : create a product
// Param body : title, value, etc...
router.post("/", ProductController.createProduct);

// PUT : update a product
// Params : id
// Param body : title, value, etc...
router.put("/:id", ProductController.updateProduct);

// DELETE : delete a product
// Params : id
router.delete("/:id", ProductController.deleteProduct);

export default router;