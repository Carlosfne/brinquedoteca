import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mmapidevelopercore1.azurewebsites.net',
})

export default api;