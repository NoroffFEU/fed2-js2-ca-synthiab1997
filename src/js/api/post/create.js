import { API_BASE_URL, API_KEY } from "../constants.js";


export async function createPost(postData) {
  const accessToken = localStorage.getItem('accessToken');
  const url = `${API_BASE_URL}/social/posts`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify(postData),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || 'Post creation failed');
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
