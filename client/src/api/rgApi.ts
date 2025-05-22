import axios from "axios";
import type { RG } from "../types/general";

const API_BASE_URL = "http://localhost:3000/api/rgs";

const RgApi = {
  async createRg(rg: RG) {
    try {
      const response = await axios.post(API_BASE_URL, rg);
      return response.data.data;
    } catch (error) {
      console.error("Error creating Rg:", error);
      throw error;
    }
  },
  async updateRg(id: number, rg: RG) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, rg);
      return response.data;
    } catch (error) {
      console.error("Error updating Rg:", error);
      throw error;
    }
  },
  async deleteRg(id: number) {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting Rg:", error);
      throw error;
    }
  },
};

export default RgApi;
