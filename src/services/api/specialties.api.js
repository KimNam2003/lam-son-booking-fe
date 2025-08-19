import axios from 'axios';
import { BASE_URL } from '../../constants/constant';

const API_BASE = `${BASE_URL}/specialties`;

export async function getSpecialties() {
  try {
    const res = await axios.get(API_BASE);
    return res // trả về dữ liệu thay vì toàn bộ response
  } catch (error) {
    console.error('Error fetching specialties:', error);
    throw error;
  }
}

// Tạo chuyên khoa
export const createSpecialty = (data) =>
  axios.post(API_BASE, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Cập nhật chuyên khoa
export const updateSpecialty = (id, data) =>
  axios.put(`${API_BASE}/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Xóa chuyên khoa
export const deleteSpecialty = (id) =>
  axios.delete(`${API_BASE}/${id}`);

