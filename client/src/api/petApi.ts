import axios from "axios";
import type { Pet, ApiResponse } from "../types/general";

const API_BASE_URL = "http://localhost:3000/api/pets";

const PetApi = {
  async getAllPets(clientId:number): Promise<Pet[]> {
    try {
      const response = await axios.get<ApiResponse<Pet[]>>(`${API_BASE_URL}/${clientId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching Pets:", error);
      throw error;
    }
  },

  async getPetById(id: number): Promise<Pet> {
    try {
      const response = await axios.get<ApiResponse<Pet>>(
        `${API_BASE_URL}/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching Pet:", error);
      throw error;
    }
  },
  async createPet(Pet: Pet): Promise<Pet> {
    try {
      const response = await axios.post<ApiResponse<Pet>>(
        API_BASE_URL,
        Pet
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating Pet:", error);
      throw error;
    }
  },
  async updatePet(id: number, Pet: Pet): Promise<Pet> {
    try {
      const response = await axios.put<ApiResponse<Pet>>(
        `${API_BASE_URL}/${id}`,
        Pet
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating Pet:", error);
      throw error;
    }
  },
  async deletePet(id: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting Pet:", error);
      throw error;
    }
  },
};

export default PetApi;
