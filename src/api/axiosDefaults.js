import axios from "axios";


// this code is based on Code Institute walkthrough project Moments

axios.defaults.baseURL = 'https://feedme-api.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();