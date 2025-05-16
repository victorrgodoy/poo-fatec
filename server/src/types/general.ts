import { Client, Pet, Product, Service, Cpf, Rg, Phone } from "@prisma/client";

export type TCpfWrite = {
  number: string;
  issueDate: Date;
};

export type TRgWrite = {
  number: string;
  issueDate: Date;
};

export type TPhoneWrite = {
  ddd: string;
  number: string;
};

// _____________  Client Types  _____________
export type TClientID = Client["id"];
export type TClientRead = Omit<Client, "registrationDate"> & {
  cpf: Omit<Cpf, "id" | "clientId"> | null;
  rgs: Omit<Rg, "id" | "clientId">[];
  phones: Omit<Phone, "id" | "clientId">[];
  pets: Omit<Pet, "id" | "clientId">[];
};
export type TClientWrite = {
  name: string;
  socialName: string;
  cpf: TCpfWrite;
  rgs: TRgWrite[];
  phones: TPhoneWrite[];
};
export type TClientDelete = Client["id"];

// _____________  Pet Types  _____________
export type TPetID = Pet["id"];
export type TPetRead = Omit<Pet, "clientId">;
export type TPetWrite = Omit<Pet, "id" | "clientId">;
export type TPetDelete = Pet["id"];

// _____________  Product Types  _____________
export type TProductID = Product["id"];
export type TProductRead = Product;
export type TProductWrite = Omit<Product, "id">;
export type TProductDelete = Product["id"];

// _____________  Service Types  _____________
export type TServiceID = Service["id"];
export type TServiceRead = Service;
export type TServiceWrite = Omit<Service, "id">;
export type TServiceDelete = Service["id"];
