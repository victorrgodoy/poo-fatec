import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import * as PetService from "../services/pet.service";
import { TPetCreate } from "../types/general";

export const listPets = asyncHandler(async (req, res) => {
  const clientId = parseInt(req.params.clientId, 10);
  const data = await PetService.listPets(clientId);
  new SuccessResponse("Pets retrieved successfully", data).send(res);
});

export const getPet = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await PetService.getPet(id);
  new SuccessResponse("Pet retrieved successfully", data).send(res);
});

export const createPet = asyncHandler(async (req, res) => {
  const pet: TPetCreate = req.body;
  const data = await PetService.createPet(pet);
  new SuccessResponse("Pet created successfully", data).send(res);
});

export const updatePet = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const pet: TPetCreate = req.body;
  const data = await PetService.updatePet(pet, id);
  new SuccessResponse("Pet updated successfully", data).send(res);
});

export const deletePet = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await PetService.deletePet(id);
  new SuccessResponse("Pet deleted successfully", { id }).send(res);
});