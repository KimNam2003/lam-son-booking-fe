import axios from "axios";
import { BASE_URL } from "../../constants/constant";

export async function getMe(token) {
  try {
    const res = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data; 
  } catch (error) {
    // Nếu backend trả rỗng hoặc lỗi
    const message = error.response?.data?.message || error.message || "Failed to fetch user";
    throw new Error(message);
  }
}
