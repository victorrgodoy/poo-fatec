import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import * as PhoneService from "../services/phone.service";
import { TPhoneCreate } from "../types/general";

export const createPhone = asyncHandler(async (req, res) => {
  const phone: TPhoneCreate = req.body;
  const data = await PhoneService.createPhone(phone);
  new SuccessResponse("Phone created successfully", data).send(res);
});

export const updatePhone = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const phone: TPhoneCreate = req.body;
  const data = await PhoneService.updatePhone(phone, id);
  new SuccessResponse("Phone updated successfully", data).send(res);
});

export const deletePhone = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await PhoneService.deletePhone(id);
  new SuccessResponse("Phone deleted successfully", { id }).send(res);
});