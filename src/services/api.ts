import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

export const fetchSymptoms = () => api.get('/symptoms');
export const fetchCfOptions = () => api.get('/cf_options');
export const submitDiagnosis = (data: any) => api.post('/diagnose', data);
export const fetchDiagnoses = () => api.get('/diagnoses');

export default api;