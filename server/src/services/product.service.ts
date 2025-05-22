import { db } from "../utils/db.server";
import { TProductID, TProductRead, TProductCreate, TProductUpdate } from "../types/general";

export const listProducts = async (): Promise<TProductRead[]> => {
  return db.product.findMany();
};

export const getProduct = async (id: TProductID): Promise<TProductRead | null> => {
  return db.product.findUnique({where: { id }});
};

export const createProduct = async (
  product: TProductCreate,
): Promise<TProductRead> => {
  const { title, value } = product;
  return db.product.create({data: {title,value}})
};

export const updateProduct = async (
    product: TProductUpdate,
    id: TProductID,
):  Promise<TProductRead> => {
    const { title, value } = product;
    return db.product.update({
        where: { id },
        data: {
            title,
            value,
        }
    });
    }

export const deleteProduct = async (id: TProductID): Promise<void> => {
  await db.product.delete({
    where: {id: id}});
};
