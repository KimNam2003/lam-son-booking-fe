import axios from "axios";
import { BASE_URL } from "../../constants/constant";

// Lấy thông tin bệnh nhân theo id
export const getPatientById = async (patientId) => {
  try {
    const token = localStorage.getItem("access_token");
    const res = await axios.get(`${BASE_URL}/patients/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin bệnh nhân theo id:", error);
    throw error;
  }
};

// Cập nhật thông tin bệnh nhân
export const updatePatient = async (patientId, payload) => {
  try {
    const token = localStorage.getItem("access_token");
    const res = await axios.put(`${BASE_URL}/patients/${patientId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin bệnh nhân:", error);
    throw error;
  }
};
