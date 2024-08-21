import axios from 'axios';


export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiFormData = axios.create({
  baseURL: 'http://localhost:8080/api',
});
