import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', 
    // baseURL:"https://rick-and-morty-backend-gsq1vcjlu-sol3127g-gmailcoms-projects.vercel.app/",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;