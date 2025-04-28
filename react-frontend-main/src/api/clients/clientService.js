import axios from 'axios'; // Importing axios for making HTTP requests

// Creating an axios instance with a base URL and credentials
const api = axios.create({
  baseURL: 'http://localhost:8081/api/client', // Base URL for the API
  withCredentials: true, // Essential for session cookies
});

// Defining the clientService object to hold API methods
const clientService = {
  // Register new user
  register: async (userData) => {
    try {
      // Sending a POST request to the /register endpoint with user data
      const response = await api.post('/register', userData, {
        headers: {
          'Content-Type': 'application/json' // Explicitly set JSON content type
        }
      });
      return response.data; // Return the response data
    } catch (error) {
      // Log the error and throw a user-friendly message
      console.error('Registration error:', error.response?.data);
      throw error.response?.data?.message || error.message || "Registration failed";
    }
  },

  // Login existing user
  login: async (email, password) => {
    try {
      // Creating URLSearchParams to send email and password
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('password', password);
      
      // Sending a POST request to the /login endpoint with credentials
      const response = await api.post('/login', params);
      return response.data; // Return the response data
    } catch (error) {
      // Throw a user-friendly message if login fails
      throw error.response?.data?.message || "Login failed";
    }
  },

  // Check authentication status
  checkAuth: async () => {
    try {
      // Sending a GET request to the /check-auth endpoint
      const response = await api.get('/check-auth');
      return response.data; // Return the response data
    } catch (error) {
      // Throw a user-friendly message if not authenticated
      throw error.response?.data?.message || "Not authenticated";
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Sending a POST request to the /logout endpoint
      await api.post('/logout');
    } catch (error) {
      // Throw a user-friendly message if logout fails
      throw error.response?.data?.message || "Logout failed";
    }
  },

  // Get all clients (admin only)
  getAllClients: async () => {
    try {
      // Sending a GET request to the /all endpoint
      const response = await api.get('/all');
      return response.data; // Return the response data
    } catch (error) {
      // Throw a user-friendly message if fetching clients fails
      throw error.response?.data?.message || "Failed to fetch clients";
    }
  },

  // Get client by ID
  getClientById: async (id) => {
    try {
      // Sending a GET request to the /{id} endpoint
      const response = await api.get(`/${id}`);
      return response.data; // Return the response data
    } catch (error) {
      // Throw a user-friendly message if fetching client fails
      throw error.response?.data?.message || "Failed to fetch client";
    }
  }
};

// Exporting the clientService object for use in other parts of the application
export default clientService;