import express from "express";
import * as ClientController from "../controllers/client.controller";

const router = express.Router();

// GET : Get List of all clients
router.get("/", ClientController.listClients);

// Get : Get one client by ID
// Param : id
router.get("/:id", ClientController.getClient);

// Post : create an client
// Param body : name, socialName, cpf, rgs, phones
router.post("/", ClientController.createClient);

// PUT : update an client
// Params : id
// Param body : name, socialName, cpf, rgs, phones
router.put("/:id", ClientController.updateClient);

// DELETE : delete an client
// Params query : id
router.delete("/:id", ClientController.deleteClient);

export default router;
