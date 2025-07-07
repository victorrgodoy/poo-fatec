import { Client, Pet, Product, Service, Cpf, Rg, Phone } from "@prisma/client";

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
};

export type TCpfWrite = {number: string; issueDate: Date};

// _____________  Rg Types  _____________
export type TRgID = Rg["id"];
export type TRgRead = Omit<Rg, "clientId">;
export type TRgCreate = {
  clientId: number;  
  number: string;
  issueDate: Date;
};
export type TRgUpdate = Omit<TRgCreate, "clientId">;  

// _____________  Phone Types  _____________
export type TPhoneID = Phone["id"];
export type TPhoneRead = Omit<Phone, "clientId">;
export type TPhoneCreate = {
  clientId: number;  
  ddd: string;
  number: string;
};
export type TPhoneUpdate = Omit<TPhoneCreate, "clientId">;  

// _____________  Pet Types  _____________
export type TPetID = Pet["id"];
export type TPetRead = Omit<Pet, "clientId">;
export type TPetCreate = {
  clientId: number;  
  name: string;
  breed: string;
  species: string;
};
export type TPetUpdate = Omit<TPetCreate, "clientId">; 

// _____________  Product Types  _____________
export type TProductID = Product["id"];
export type TProductRead = Product;
export type TProductCreate = {
  title: string;
  value: number;
}
export type TProductUpdate = Omit<TProductCreate, "clientId">;

// _____________  Service Types  _____________
export type TServiceID = Service["id"];
export type TServiceRead = Service;
export type TServiceCreate = {
  title: string;
  value: number;
}
export type TServiceUpdate = Omit<TServiceCreate, "clientId">;
