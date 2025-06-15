/*import { API_BASE_URL } from "./constants.js";

async function loginUser(email, password) {
    const errorMessages = document.getElementById("errorMessages");
    const successMessages = document.getElementById("successMessages");

    try {
        const response = await fetch(`${API_BASE_URL}/social/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            const accessToken = data.token;
            localStorage.setItem("accessToken", accessToken);

            // Extract and store userId if required
            const userId = JSON.parse(atob(accessToken.split('.')[1])).sub;
            localStorage.setItem('userId', userId);

            // Display success message and redirect with delay
            successMessages.innerText = "Login successful! Redirecting...";
            setTimeout(() => window.location.href = "posts.html", 800);
        } else {
            errorMessages.innerText = `Error: ${data.message}`;
        }
    } catch (error) {
        errorMessages.innerText = "An error occurred during login.";
        console.error("Error:", error);
    }
}

document.getElementById('loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation
    if (!email || !password) {
        document.getElementById("errorMessages").innerText = "Both email and password are required.";
        return;
    }

    loginUser(email, password);
});*/

import { API_BASE_URL, API_KEY } from '../../ui/globals/constants.js';

export async function loginUser(email, password) {
  const url = `${API_BASE_URL}/auth/login`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || 'Login failed');
    }
    const { data } = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('profile', JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
}
