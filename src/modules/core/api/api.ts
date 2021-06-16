import axios from 'axios';

export const api = axios.create({
  baseURL: 'localhost:8888',
  timeout: 1000 * 10,
});
