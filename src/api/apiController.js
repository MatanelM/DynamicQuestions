import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "https://landa.wiki", // Replace with your backend URL
  timeout: 15000, // Request timeout
});

// Add a request interceptor (middleware)
apiClient.interceptors.request.use(
  (config) => {
    // You can add headers or tokens here
    console.log("Request sent:", config);
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor (middleware)
apiClient.interceptors.response.use(
  (response) => {
    // Process the response before sending it back
    console.log("Response received:", response);
    return response.data; // Simplify the response object
  },
  (error) => {
    // Handle response errors
    console.error("API error:", error.response);
    return Promise.reject(error);
  }
);

// API functions
const apiController = {
  getRandomData: () => apiClient.get("/random"), // GET request
  getQuestionsFromFile: (data) => apiClient.post("/questions/pdf_file", data), // POST request
  getQuestionsFromLink: (data) => apiClient.post("/questions/pdf_link", data), // POST request
  postTwoTextFieldsData: (data) => apiClient.post("/example", data), // POST request
};

export default apiController;
