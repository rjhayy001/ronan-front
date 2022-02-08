import axios from "axios";
import router from '@/routers'
// const baseDomain = "https://ronan.checkmy.dev";
const baseDomain = "http://127.0.0.1:9191";
const baseURL = `${baseDomain}/api`; // Incase of /api/v1;

const httpClient = axios.create({
    baseURL,
});

httpClient.interceptors.request.use(function(config) {
    let getAuthToken = () => localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${getAuthToken()}`;
    return config;
})
httpClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    let messages = []
    switch (error.response.status) {
        case 404:

            break;
        case 500:
            messages.push('Internal Server Error. Please contact the developer to resolve this issue.')
            break;
        case 503:
            messages.push('Service unavailable, please check your internet connection to continue.')
            break;
        case 401:
            localStorage.setItem('token', '')
            router.push({ name: 'login' })
            messages.push('You are not logged in. Please login first.')
            break;
        case 422:
            messages.push(error.response.data.message)
            break;
        default:
            messages.push('Opps, something went wrong in processing your request.')
            break;
    }

    //   messages.forEach(message => {
    //     Vue.toasted.error(message, {
    //       icon : {
    //         name : 'alert-circle',
    //       }
    //     })
    //   })
    return Promise.reject( error );
});

export default httpClient;