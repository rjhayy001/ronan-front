import axios from '@/plugins/axios';
let resource = '/centers'

export const GetAllCenters = () => axios.get(`${resource}`)
export const GetCenterInfo = (id) => axios.get(`${resource}/${id}`)
export const AddEmployee = (payload) => axios.post(`${resource}/add_users`, payload)
export const RemoveEmployee = (id,payload) => axios.post(`${resource}/delete_users/${id}`, payload)