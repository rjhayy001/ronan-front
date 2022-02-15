import axios from '@/plugins/axios';
let resource = '/users'

export const GetAllEmployees = () => axios.get(`${resource}`)
export const DeleteEmployee = (id) => axios.delete(`${resource}/${id}`)
export const UpdateEmployee = (id, payload) => axios.put(`${resource}/${id}`, payload)
export const GetEmployeeInfo = (id) => axios.get(`${resource}/get_user/${id}`)
export const GetAllRoles = () => axios.get(`/roles`)