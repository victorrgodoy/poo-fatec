import express from "express";
import * as PhoneController from "../controllers/phone.controller";

const router = express.Router();

// POST: Cria um novo telefone para um cliente
router.post("/", PhoneController.createPhone);

// PUT: Atualiza um telefone existente
router.put("/:id", PhoneController.updatePhone);

// DELETE: Remove um telefone
router.delete("/:id", PhoneController.deletePhone);

export default router;