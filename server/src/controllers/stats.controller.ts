import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import * as StatsService from "../services/stats.service";

export const registerConsume = asyncHandler(async (req, res) => {
  const { cpf, itemType, itemName, petName, quantity = 1 } = req.body;
  const quantityNumber = Number(quantity);
  const data = await StatsService.registerItem({
    cpf,
    itemType,
    itemName,
    petName,
    quantity: quantityNumber,
  });

  new SuccessResponse("Consumo registrado com sucesso", data).send(res);
});

// Histórico de consumo (produtos e serviços por cliente)
export const historicConsumption = asyncHandler(async (_, res) => {
  const data = await StatsService.getHistoric();
  new SuccessResponse("Historic consumption retrieved", data).send(res);
});

// Top 10 clientes por quantidade de consumo
export const top10Consumers = asyncHandler(async (_, res) => {
  const data = await StatsService.getTop10Consumers();
  new SuccessResponse("Top 10 consumers retrieved", data).send(res);
});

// Top produtos/serviços mais consumidos
export const topItemsConsumed = asyncHandler(async (_, res) => {
  const data = await StatsService.getTopItemsConsumed();
  new SuccessResponse("Top items consumed retrieved", data).send(res);
});

// Itens mais consumidos por tipo/raça de pet
export const itemsByPetType = asyncHandler(async (_, res) => {
  const data = await StatsService.getItemsByPet();
  new SuccessResponse("Items by pet type retrieved", data).send(res);
});
export const topClientsBySpent = asyncHandler(async (_, res) => {
  const data = await StatsService.getClientsByAmountSpent();
  new SuccessResponse("Top clients by amount spent retrieved", data).send(res);
});