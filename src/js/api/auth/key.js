import { API_AUTH_KEY } from "../constants.js";
import { headers } from "../headers.js";

export async function getKey(name = "API Key") {
  try {
    // Check if the API key is already in localStorage
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      return storedApiKey;
    }

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found. Please log in to create an API key.");
    }

    const body = { name };

    const response = await fetch(API_AUTH_KEY, {
      headers: headers(), // Adjusted to use headers() without arguments
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.status === 201) {
      const { data } = await response.json();
      const apiKey = data.key;

      // Store the newly created API key in localStorage
      localStorage.setItem("apiKey", apiKey);

      return apiKey;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Failed to create API key: ${errorMessage}`);
    }
  } catch (error) {
    console.error(`Error creating the API key: ${error.message}`);
    throw error;
  }
}

import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";

export async function registerUser({ email, password }) {
    const response = await fetch(API_AUTH_REGISTER, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json(); // Return the response data
}
