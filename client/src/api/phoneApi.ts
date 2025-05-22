import axios from "axios";
import type { Phone } from "../types/general";

const API_BASE_URL = "http://localhost:3000/api/phones";

const PhoneApi = {
  async createPhone(phone: Phone) {
    try {
      const response = await axios.post(API_BASE_URL, phone);
      return response.data;
    } catch (error) {
      console.error("Error creating Phone:", error);
      throw error;
    }
  },
  async updatePhone(id: number, phone: Phone) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, phone);
      return response.data;
    } catch (error) {
      console.error("Error updating Phone:", error);
      throw error;
    }
  },
  async deletePhone(id: number) {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting Phone:", error);
      throw error;
    }
  },
};

export default PhoneApi;
