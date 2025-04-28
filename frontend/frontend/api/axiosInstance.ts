import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5004/api',  // or 5001 if you're running backend on 5001
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
