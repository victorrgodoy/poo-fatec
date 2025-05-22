import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import * as RgService from "../services/rg.service";
import { TRgCreate } from "../types/general";

export const createRg = asyncHandler(async (req, res) => {
  const rg: TRgCreate = req.body;
  const data = await RgService.createRg(rg);
  new SuccessResponse("RG created successfully", data).send(res);
});

export const updateRg = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const rg: TRgCreate = req.body;
  const data = await RgService.updateRg(rg, id);
  new SuccessResponse("RG updated successfully", data).send(res);
});

export const deleteRg = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await RgService.deleteRg(id);
  new SuccessResponse("RG deleted successfully", { id }).send(res);
});