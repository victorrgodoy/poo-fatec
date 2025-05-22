import { db } from "../utils/db.server";
import { TPetID, TPetRead, TPetCreate, TPetUpdate} from "../types/general";

export const listPets = async (clientId: number): Promise<TPetRead[]> => {
  return db.pet.findMany({
    where: {
      clientId: clientId, 
    },
  });
};

export const getPet = async (id: TPetID): Promise<TPetRead | null> => {
  return db.pet.findUnique({where: { id }})
};

export const createPet = async (
  pet: TPetCreate,
): Promise<TPetRead> => {
  const {clientId, name, breed, species} = pet;
  return db.pet.create({data: {clientId, name,breed,species}});
};

export const updatePet = async (
  pet: TPetUpdate,
  id: TPetID,
): Promise<TPetRead> => {
  const { name, breed, species} = pet;
  return db.pet.update({
    where: { id },
    data: {
      name,
      breed,
      species
    },
  });
};

export const deletePet = async (id: TPetID): Promise<void> => {
  await db.pet.delete({
    where: {
      id: id,
    },
  });
};
