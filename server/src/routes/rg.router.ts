import express from "express";
import * as RgController from "../controllers/rg.controller";

const router = express.Router();

// POST: Cria um novo RG para um cliente
router.post("/", RgController.createRg);

// PUT: Atualiza um RG existente
router.put("/:id", RgController.updateRg);

// DELETE: Remove um RG
router.delete("/:id", RgController.deleteRg);

export default router;