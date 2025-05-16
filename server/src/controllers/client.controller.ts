import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import * as ClientService from '../services/client.service'
import { TClientWrite } from "../types/general";

export const listClients = asyncHandler(async (_, res) => {
    const data = await ClientService.listClients();
    new SuccessResponse("Clients retrieved successfully", data).send(res);
});

export const getClient = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const data = await ClientService.getClient(id)
    new SuccessResponse("Client retrieved succesfully", data).send(res)
})

export const createClient = asyncHandler(async (req, res) => {
    const client:TClientWrite = req.body
    const data = await ClientService.createClient(client)
    new SuccessResponse("Client created succesfully", data).send(res)
})

export const updateClient = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const client:TClientWrite = req.body
    const data = await ClientService.updateClient(client, id)
    new SuccessResponse("Client updated succesfully", data).send(res)
})

export const deleteClient = asyncHandler(async (req,res)=> {
    const id = parseInt(req.params.id, 10)
    const data = await ClientService.deleteClient(id)
    new SuccessResponse("Client deleted succesfully", data).send(res)
})