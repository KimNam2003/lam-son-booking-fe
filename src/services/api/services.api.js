import axios from 'axios';
import { BASE_URL } from '../../constants/constant';


export const getServiceById =(id)=> 
  axios.get(`${BASE_URL}/services?serviceId=${id}`);

export const getServicesBySpecialtyId =(id)=> 
  axios.get(`${BASE_URL}/services?specialtyId=${id}`);
