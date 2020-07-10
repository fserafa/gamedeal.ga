import Axios from 'axios';

const api = Axios.create({
    baseURL: 'https://www.reddit.com'
})

export default api;