import axios from "axios";
import type { Client, ApiResponse } from "../types/general";

const API_BASE_URL = "http://localhost:3000/api/clients";

const ClientApi = {
  async getAllClients(): Promise<Client[]> {
    try {
      const response = await axios.get<ApiResponse<Client[]>>(API_BASE_URL);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching clients:", error);
      throw error;
    }
  },

  async getClientById(id: number): Promise<Client> {
    try {
      const response = await axios.get<ApiResponse<Client>>(
        `${API_BASE_URL}/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching client:", error);
      throw error;
    }
  },
  async createClient(client: Client): Promise<Client> {
    try {
      const response = await axios.post<ApiResponse<Client>>(
        API_BASE_URL,
        client
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating client:", error);
      throw error;
    }
  },
  async updateClient(id: number, client: Client): Promise<Client> {
    try {
      const response = await axios.put<ApiResponse<Client>>(
        `${API_BASE_URL}/${id}`,
        client
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    }
  },
  async deleteClient(id: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
    }
  },
};

export default ClientApi;
