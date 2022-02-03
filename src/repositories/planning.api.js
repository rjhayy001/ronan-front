import axios from '@/plugins/axios';
let resource = '/planning'
let holidays = '/holidays'

export const Insert = (payload) => axios.post(`${resource}/insert`, payload)
export const Delete = (id) => axios.delete(`${resource}/delete/${id}`)
export const Update = (payload) => axios.put(`${resource}/update`, payload)

// planning holiday
export const createHoliday = (payload) => axios.post(`${holidays}/admin_create_holiday`, payload)


