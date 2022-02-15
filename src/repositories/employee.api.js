import axios from '@/plugins/axios';
let resource = '/users'

export const GetAllEmployees = () => axios.get(`${resource}`)
export const GetAllEmployeesSort = () => axios.get(`user/getAllUser`)
export const GetCenterInfo = (id) => axios.get(`${resource}/${id}`)