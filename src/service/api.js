import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://localhost:8080/api-java/',
});

export const Api2 = axios.create({
  baseURL: 'http://localhost:3000/',
});
