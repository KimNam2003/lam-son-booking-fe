// src/services/authService.js
import axios from "axios";
import { BASE_URL } from '../../constants/constant';

export async function login(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/log-in`, { email, password });
    console.log(response.data)
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Login failed";
    throw new Error(message);
  }
}

export async function signUpUser(formData) {
  return axios.post(`${BASE_URL}/users/sign-up`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
