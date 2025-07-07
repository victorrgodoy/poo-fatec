import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import * as ServiceService from "../services/service.service";
import { TServiceCreate } from "../types/general";

export const listServices = asyncHandler(async (_, res) => {
  const data = await ServiceService.listServices();
  new SuccessResponse("Services retrieved successfully", data).send(res);
});

export const getService = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await ServiceService.getService(id);
  new SuccessResponse("Service retrieved successfully", data).send(res);
});

export const createService = asyncHandler(async (req, res) => {
  const service: TServiceCreate = req.body;
  const data = await ServiceService.createService(service);
  new SuccessResponse("Service created successfully", data).send(res);
});

export const updateService = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const service: TServiceCreate = req.body;
  const data = await ServiceService.updateService(service, id);
  new SuccessResponse("Service updated successfully", data).send(res);
});

export const deleteService = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await ServiceService.deleteService(id);
  new SuccessResponse("Service deleted successfully", { id }).send(res);
});