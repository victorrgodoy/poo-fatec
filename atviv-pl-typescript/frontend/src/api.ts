export const API_BASE_URL = "http://localhost:32831/cliente";

export interface Telefone {
  ddd: string;
  numero: string;
}

export interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  codigoPostal: string;
  informacoesAdicionais: string;
}

export interface Cliente {
  nome: string;
  nomeSocial: string;
  email: string | null;
  endereco: Endereco;
  telefones: Telefone[];
}

export function CLIENT_GET(): { url: string; options: RequestInit } {
  return {
    url: `${API_BASE_URL}/clientes`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function CLIENT_SAVE_POST(body: Cliente): { url: string; options: RequestInit } {
  return {
    url: `${API_BASE_URL}/cadastrar`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function CLIENT_UPDATE_PUT(body: Cliente): { url: string; options: RequestInit } {
  return {
    url: `${API_BASE_URL}/atualizar`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function CLIENT_DELETE(client: Cliente): { url: string; options: RequestInit } {
  return {
    url: `${API_BASE_URL}/excluir`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(client),
    },
  };
}

const apiClient = {
  CLIENT_GET,
  CLIENT_SAVE_POST,
  CLIENT_DELETE,
  CLIENT_UPDATE_PUT,
};

export default apiClient;