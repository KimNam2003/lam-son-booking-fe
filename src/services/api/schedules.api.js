import axios from 'axios';
import { BASE_URL } from '../../constants/constant';


export const getSchedulesByDoctorId =(id)=> 
  axios.get(`${BASE_URL}/schedules?doctorId=${id}`);

export const getSlotsByDate =(id)=> 
  axios.get(`${BASE_URL}/appointment-slots/schedule/${id}/date/:date`);
