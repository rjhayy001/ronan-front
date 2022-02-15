import axios from '@/plugins/axios';
let resource = '/national_holidays'
//  national holidays
export const GetAllHolidays = () => axios.get(`${resource}`)
export const CreateHolidays = (payload) => axios.post(`${resource}`, payload)
export const RemoveHolidays = (id,payload) => axios.delete(`${resource}/${id}`, payload)

// employee holidays
let holiday = '/holidays'
export const GetEmployeeHolidays = () => axios.get(`${holiday}/logged`)
export const GetPendingHolidays = () => axios.get(`${holiday}/all_pending`)

export const DeclineHoliday = (payload) => axios.post(`${holiday}/decline_request`, payload)
export const ApproveHoliday = (id) => axios.get(`${holiday}/approve_request/${id}`)