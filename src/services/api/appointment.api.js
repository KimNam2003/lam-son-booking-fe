import axios from "axios";
import { BASE_URL } from "../../constants/constant";

// Lấy token từ localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Missing access token");
  return { Authorization: `Bearer ${token}` };
};

// Tạo cuộc hẹn
export const createAppointment = async ({ slotId, note }) => {
  if (!slotId) throw new Error("Missing required field: slotId");
  try {
    const res = await axios.post(
      `${BASE_URL}/appointments`,
      { slotId, note },
      { headers: getAuthHeader(),} 

    );
    return res.data;
  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    throw error;
  }
};

// Lấy danh sách cuộc hẹn theo bệnh nhân
export const getAppointmentsByPatient = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/appointments`, {
      headers: getAuthHeader(),
    });
    return res;
  } catch (error) {
    console.error("❌ Error fetching appointments by patient:", error);
    throw error;
  }
};

// Lấy chi tiết cuộc hẹn
export const getAppointmentById = async (id) => {
  if (!id) throw new Error("Appointment ID is required");
  try {
    const res = await axios.get(`${BASE_URL}/appointments/${id}`, {
       headers: getAuthHeader(),

    });
    return res;
  } catch (error) {
    console.error("❌ Error fetching appointment:", error);
    throw error;
  }
};

// Cập nhật trạng thái cuộc hẹn
export const updateAppointmentStatus = async (id, status) => {
  if (!id || !status) throw new Error("Missing id or status");
  try {
    const res = await axios.patch(
      `${BASE_URL}/appointments/${id}/status`,
      { status },
      { headers: getAuthHeader() }
    );
    return res.data;
  } catch (error) {
    console.error("❌ Error updating appointment status:", error);
    throw error;
  }
};

// Hủy cuộc hẹn
export const cancelAppointment = async (id) => {
  if (!id) throw new Error("Appointment ID is required");
  try {
    const res = await axios.delete(`${BASE_URL}/appointments/${id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error canceling appointment:", error);
    throw error;
  }
}

  // Lấy danh sách cuộc hẹn theo bác sĩ
export const getAppointmentsByDoctor = async (status) => {
  try {
    const res = await axios.get(`${BASE_URL}/appointments`, {
      params: status ? { status } : {}, // nếu có status thì gửi query param
      headers: getAuthHeader(),
    });
    return res.data; // trả về data trực tiếp
  } catch (error) {
    console.error("❌ Error fetching appointments by doctor:", error);
    throw error;
  }
};



