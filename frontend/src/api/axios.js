// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});



export default instance;


export const apiurl = "http://localhost:5000"
