import axios from '@/plugins/axios';
let resource = '/users'

export const GetAllEmployees = () => axios.get(`${resource}`)
export const GetCenterInfo = (id) => axios.get(`${resource}/${id}`)