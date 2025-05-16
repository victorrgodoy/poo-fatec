"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClient = exports.listClients = void 0;
const db_server_1 = require("../utils/db.server");
const listClients = async () => {
    return db_server_1.db.client.findMany({
        include: {
            cpf: true,
            rgs: true,
            phones: true,
            pets: true,
        },
    });
};
exports.listClients = listClients;
const getClient = async (id) => {
    return db_server_1.db.client.findUnique({
        where: { id },
        include: {
            cpf: true,
            rgs: true,
            phones: true,
            pets: true,
        },
    });
};
exports.getClient = getClient;
const createClient = async (client) => {
    const { name, socialName, cpf, rgs, phones } = client;
    return db_server_1.db.client.create({
        data: {
            name,
            socialName,
            cpf: {
                create: {
                    number: cpf.number,
                    issueDate: new Date(cpf.issueDate),
                },
            },
            rgs: {
                create: rgs.map(rg => ({
                    number: rg.number,
                    issueDate: new Date(rg.issueDate),
                })),
            },
            phones: {
                create: phones.map(phone => ({
                    ddd: phone.ddd,
                    number: phone.number,
                })),
            },
        },
        include: {
            cpf: true,
            rgs: true,
            phones: true,
            pets: true,
        },
    });
};
exports.createClient = createClient;
const updateClient = async (client, id) => {
    const { name, socialName, cpf, rgs, phones } = client;
    return db_server_1.db.client.update({
        where: { id },
        data: {
            name,
            socialName,
            cpf: {
                update: cpf,
            },
            rgs: {
                deleteMany: {},
                create: rgs,
            },
            phones: {
                deleteMany: {},
                create: phones,
            },
        },
        include: {
            cpf: true,
            rgs: true,
            phones: true,
            pets: true,
        },
    });
};
exports.updateClient = updateClient;
const deleteClient = async (id) => {
    await db_server_1.db.client.delete({
        where: {
            id: id,
        },
    });
};
exports.deleteClient = deleteClient;
