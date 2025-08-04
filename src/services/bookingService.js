import api from './api';

export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const getAvailableSlots = async (doctorId, date) => {
  try {
    const response = await api.get(`/doctors/${doctorId}/slots`, {
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching slots:', error);
    return [];
  }
};

export const getUserAppointments = async () => {
  try {
    const response = await api.get('/appointments/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    return [];
  }
};
