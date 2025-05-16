"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClient = exports.listClients = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ApiResponse_1 = require("../core/ApiResponse");
const ClientService = __importStar(require("../services/client.service"));
exports.listClients = (0, express_async_handler_1.default)(async (_, res) => {
    const data = await ClientService.listClients();
    new ApiResponse_1.SuccessResponse("Clients retrieved successfully", data).send(res);
});
exports.getClient = (0, express_async_handler_1.default)(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = await ClientService.getClient(id);
    new ApiResponse_1.SuccessResponse("Client retrieved succesfully", data).send(res);
});
exports.createClient = (0, express_async_handler_1.default)(async (req, res) => {
    const client = req.body;
    const data = await ClientService.createClient(client);
    new ApiResponse_1.SuccessResponse("Client created succesfully", data).send(res);
});
exports.updateClient = (0, express_async_handler_1.default)(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const client = req.body;
    const data = await ClientService.updateClient(client, id);
    new ApiResponse_1.SuccessResponse("Client updated succesfully", data).send(res);
});
exports.deleteClient = (0, express_async_handler_1.default)(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = await ClientService.deleteClient(id);
    new ApiResponse_1.SuccessResponse("Client deleted succesfully", data).send(res);
});
