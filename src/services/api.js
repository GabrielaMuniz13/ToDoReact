import axios from 'axios';

const api = axios.create({
    baseUrl: 'http://localhost:4000'
});

export default api;