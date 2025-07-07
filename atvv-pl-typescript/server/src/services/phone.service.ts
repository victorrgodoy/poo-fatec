import { db } from "../utils/db.server";
import { TPhoneID, TPhoneRead, TPhoneCreate, TPhoneUpdate } from "../types/general";

export const createPhone = async (
  phone: TPhoneCreate
): Promise<TPhoneRead> => {
  const { ddd, number, clientId } = phone;
  return db.phone.create({
    data: {
      clientId,
      ddd,
      number
    }
  });
};

export const updatePhone = async (
  phone: TPhoneUpdate,
  id: TPhoneID  
): Promise<TPhoneRead> => {
  const { ddd, number } = phone;
  return db.phone.update({
    where: { id },
    data: {
      ddd,
      number
    }
  });
};

export const deletePhone = async (id: TPhoneID): Promise<void> => {
  await db.phone.delete({
    where: { id }
  });
};