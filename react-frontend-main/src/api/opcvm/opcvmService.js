import axios from "axios";

// Create an instance of axios with the base URL and headers for the OPCVM API
const api = axios.create({
  baseURL: "http://localhost:8084/opcvm",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define the OPCVM service with methods to fetch data
const opcvmService = {
  // Method to fetch names and codes of OPCVMs
  getNamesAndCodes: async () => {
    try {
      // Make a GET request to the /noms-codes endpoint
      const response = await api.get("/noms-codes");
      return response.data; // Return the fetched data
    } catch (error) {
      // Log the error and throw a custom error message
      console.error(
        "OPCVM fetch error:",   
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch OPCVM data"
      );
    }
  },

  // Method to fetch performance data for a specific OPCVM code
  getPerformance: async (code) => {
    try {
      // Make a GET request to the /{code}/performance endpoint
      const response = await api.get(`/${code}/performance`);
      return response.data; // Return the fetched performance data
    } catch (error) {
      // Log the error and throw a custom error message
      console.error("Performance fetch error:", error);
      throw (
        error.response?.data?.message || "Failed to fetch OPCVM performance"
      );
    }
  },
};

export default opcvmService;