import { db } from "../utils/db.server";
import { TRgID, TRgRead, TRgCreate, TRgUpdate } from "../types/general"; 

export const createRg = async (
  rg: TRgCreate 
): Promise<TRgRead> => {
  const { clientId, number, issueDate } = rg;
  return db.rg.create({
    data: {
      clientId,
      number,
      issueDate: new Date(issueDate) 
    }
  });
};

export const updateRg = async (
  rg: TRgUpdate, 
  id: TRgID
): Promise<TRgRead> => {
  const { number, issueDate } = rg; 
  return db.rg.update({
    where: { id },
    data: {
      number,
      issueDate: new Date(issueDate) 
    }
  });
};

export const deleteRg = async (id: TRgID): Promise<void> => {
  await db.rg.delete({
    where: { id }
  });
};