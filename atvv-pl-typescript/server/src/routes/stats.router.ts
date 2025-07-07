import express from "express";
import * as StatsController from "../controllers/stats.controller";

const router = express.Router();

// GET: Histórico de consumo (produtos e serviços)
router.get("/historic", StatsController.historicConsumption);

// GET: Top 10 clientes por quantidade de consumo
router.get("/top10", StatsController.top10Consumers);

// GET: Top produtos e serviços mais consumidos
router.get("/top-items", StatsController.topItemsConsumed);

// GET: Itens mais consumidos por tipo/raça de pet
router.get("/items-by-pet", StatsController.itemsByPetType);

// GET: Clientes que mais gastaram (valor total)
router.get("/top-by-amount", StatsController.topClientsBySpent);


router.post("/register", StatsController.registerConsume);

export default router;