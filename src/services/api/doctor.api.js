import axios from 'axios';
import { BASE_URL } from '../../constants/constant';


export const getDoctorsByServiceId = (serviceId) => 
  axios.get(`${BASE_URL}/doctors?serviceId=${serviceId}`);

export const getDoctorById = (id) => 
  axios.get(`${BASE_URL}/doctors/${id}`);


export const getDoctorById2 = (id) => {
  const token = localStorage.getItem("token"); // lấy token từ localStorage
  return axios.get(`${BASE_URL}/doctors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 👉 Update thông tin bác sĩ
export const updateDoctorById = (id, data) => {
  const token = localStorage.getItem("access_token"); 
  return axios.patch(`${BASE_URL}/doctors/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMyDoctorAccount = (id) => {
  const token = localStorage.getItem("access_token"); 
  return axios.delete(`${BASE_URL}/doctors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};