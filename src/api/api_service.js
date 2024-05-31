import axios from "axios";

const headers = {
	"X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
	"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
};

const api_url = import.meta.env.VITE_API_URL;

// Create an Axios instance
const apiClient = axios.create({
	baseURL: api_url, // Replace with your API's base URL
	headers: headers,
	timeout: 10000, // Set a timeout for requests
});

// Intercept responses and handle global errors
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error(error);
		return Promise.reject(error);
	}
);

export default {
	get(resource, params) {
	  return apiClient.get(resource, { params });
	}
}
