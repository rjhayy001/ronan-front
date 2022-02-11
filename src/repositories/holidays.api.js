import axios from '@/plugins/axios';
let resource = '/national_holidays'

export const GetAllHolidays = () => axios.get(`${resource}`)
export const CreateHolidays = (payload) => axios.post(`${resource}`, payload)
export const RemoveHolidays = (id,payload) => axios.delete(`${resource}/${id}`, payload)