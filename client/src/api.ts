export const BASE_URL = "http://localhost:3000/api/clients";

type RequestConfig = {
  url: string;
  options: RequestInit;
};

export interface CPF {
  number: string;
  issueDate: string;
}

export interface RG {
  number: string;
  issueDate: string;
}

export interface Phone {
  ddd: string;
  number: string;
}

export interface Client {
  id?: number;
  name: string;
  socialName: string;
  cpf: CPF;
  rgs: RG[];
  telefones: Phone[];
}

const jsonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export function LIST_CLIENTS(): RequestConfig {
  return {
    url: `${BASE_URL}/`,
    options: {
      method: "GET",
      headers: jsonHeaders,
    },
  };
}

export function FIND_CLIENT(id: number): RequestConfig {
  return {
    url: `${BASE_URL}/${id}`,
    options: {
      method: "GET",
      headers: jsonHeaders,
    },
  };
}

export function CREATE_CLIENT(body: Client): RequestConfig {
  return {
    url: `${BASE_URL}`,
    options: {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(body),
    },
  };
}

export function UPDATE_CLIENT(id: number, body: Client): RequestConfig {
  return {
    url: `${BASE_URL}/${id}`,
    options: {
      method: "PUT",
      headers: jsonHeaders,
      body: JSON.stringify(body),
    },
  };
}

export function DELETE_CLIENT(id: number): RequestConfig {
  return {
    url: `${BASE_URL}/${id}`,
    options: {
      method: "DELETE",
      headers: jsonHeaders,
    },
  };
}

const apiClient = {
  LIST_CLIENTS,
  FIND_CLIENT,
  CREATE_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT,
};

export default apiClient;
