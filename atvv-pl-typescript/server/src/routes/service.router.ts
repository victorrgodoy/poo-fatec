import express from "express";
import * as ServiceController from "../controllers/service.controller";

const router = express.Router();

// GET : Get List of all services
router.get("/", ServiceController.listServices);

// GET : Get one service by ID
// Param : id
router.get("/:id", ServiceController.getService);

// POST : create a service
// Param body : name, description, price, duration, etc...
router.post("/", ServiceController.createService);

// PUT : update a service
// Params : id
// Param body : name, description, price, duration, etc...
router.put("/:id", ServiceController.updateService);

// DELETE : delete a service
// Params : id
router.delete("/:id", ServiceController.deleteService);

export default router;
