import axios from "axios";
import { BASE_URL } from "../../constants/constant";

export const getSlotsByDate = (scheduleId, serviceId, date) =>
  axios.get(`${BASE_URL}/appointment-slots/by-date?scheduleId=${scheduleId}&serviceId=${serviceId}&date=${date}`);
