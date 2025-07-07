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

export const createClient = async (
  client: TClientWrite,
): Promise<TClientRead> => {
  const { name, socialName, cpf} = client;

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
    },
    include: {
      cpf: true,
      rgs: true,
      phones: true,
      pets: true,
    },
  });
};

export const updateClient = async (
  client: TClientWrite,
  id: TClientID,
): Promise<TClientRead> => {
  const { name, socialName} = client;
  return db.client.update({
    where: { id },
    data: {
      name,
      socialName,
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
    where: {id: id}});
};
