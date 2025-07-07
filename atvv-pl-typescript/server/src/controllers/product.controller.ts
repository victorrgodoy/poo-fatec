import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import * as ProductService from "../services/product.service";
import { TProductCreate } from "../types/general";

export const listProducts = asyncHandler(async (_, res) => {
  const data = await ProductService.listProducts();
  new SuccessResponse("Products retrieved successfully", data).send(res);
});

export const getProduct = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await ProductService.getProduct(id);
  new SuccessResponse("Product retrieved successfully", data).send(res);
});

export const createProduct = asyncHandler(async (req, res) => {
  const product: TProductCreate = req.body;
  const data = await ProductService.createProduct(product);
  new SuccessResponse("Product created successfully", data).send(res);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product: TProductCreate = req.body;
  const data = await ProductService.updateProduct(product, id);
  new SuccessResponse("Product updated successfully", data).send(res);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await ProductService.deleteProduct(id);
  new SuccessResponse("Product deleted successfully", { id }).send(res);
});