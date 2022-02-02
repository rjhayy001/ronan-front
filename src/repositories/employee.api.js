import axios from '@/plugins/axios';
let resource = '/users'

export const GetAllEmployees = () => axios.get(`${resource}`)
export const GetEmployeeInfo = (id) => axios.get(`${resource}/get_user/${id}`)