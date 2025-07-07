import { db } from "../utils/db.server";
import { TServiceID, TServiceRead, TServiceCreate, TServiceUpdate } from "../types/general";

export const listServices = async (): Promise<TServiceRead[]> => {
  return db.service.findMany();
};

export const getService = async (id: TServiceID): Promise<TServiceRead | null> => {
  return db.service.findUnique({ where: { id } });
};

export const createService = async (
  service: TServiceCreate
): Promise<TServiceRead> => {
  const { title, value } = service;
  return db.service.create({
    data: {
      title,
      value
    }
  });
};

export const updateService = async (
  service: TServiceUpdate,
  id: TServiceID
): Promise<TServiceRead> => {
  const { title, value} = service;
  return db.service.update({
    where: { id },
    data: {
        title, 
        value
    }
  });
};

export const deleteService = async (id: TServiceID): Promise<void> => {
  await db.service.delete({
    where: { id }
  });
};