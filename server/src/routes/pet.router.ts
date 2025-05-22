import express from "express";
import * as PetController from "../controllers/pet.controller";

const router = express.Router();

// GET : Get List of all pets
router.get("/:clientId", PetController.listPets);

// GET : Get one pet by ID
// Param : id
router.get("/:id", PetController.getPet);

// POST : create a pet for a specific client
// Param body : name, species, breed, age, etc...
router.post("/", PetController.createPet);

// PUT : update a pet
// Params : id
// Param body : name, species, breed, age, etc...
router.put("/:id", PetController.updatePet);

// DELETE : delete a pet
// Params : id
router.delete("/:id", PetController.deletePet);

export default router;