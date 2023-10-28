import axios from 'axios';

// Menyimpan url endpoint untuk request ke back-end
const api = axios.create({
  // eslint-disable-next-line comma-dangle
  baseURL: 'http://localhost:8080'
});

export default api;
