import axios from 'axios';

export default axios.create({
    baseURL: 'https://attractive-bonnet-duck.cyclic.app/',
    // baseURL: 'http://localhost:3000/',
    timeout: 10000,
    headers: { 'content-type': 'application/json' }
});