import { db } from "../utils/db.server";
import { TClientID, TClientRead, TClientWrite } from "../types/general";

export const listClients = async (): Promise<TClientRead[]> => {
  return db.client.findMany({
    include: {
      cpf: true,
      rgs: true,
      phones: true,
      pets: true,
    },
  });
};

export const getClient = async (id: TClientID): Promise<TClientRead | null> => {
  return db.client.findUnique({
    where: { id },
    include: {
      cpf: true,
      rgs: true,
      phones: true,
      pets: true,
    },
  });
};

export const createClient = async (client: TClientWrite): Promise<TClientRead> => {
  const { name, socialName, cpf, rgs, phones } = client;

  return db.client.create({
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

export const updateClient = async (client: TClientWrite, id: TClientID): Promise<TClientRead> => {
  const { name, socialName, cpf, rgs, phones } = client;
  return db.client.update({
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

export const deleteClient = async (id: TClientID): Promise<void> => {
  await db.client.delete({
    where: {
      id: id,
    },
  });
};