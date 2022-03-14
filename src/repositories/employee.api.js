import axios from '@/plugins/axios';
let resource = '/users'

export const GetAllEmployees = () => axios.get(`${resource}`)
export const GetFilteredEmployee = () => axios.get(`${resource}/filtered`)
export const GetCenterInfo = (id) => axios.get(`${resource}/${id}`)

export const UpdateInfo = (id, payload) => axios.put(`${resource}/${id}`, payload)
export const GetAllEmployeesSort = () => axios.get(`user/getAllUser`)
export const DeleteEmployee = (id) => axios.delete(`${resource}/${id}`)
export const UpdateEmployee = (id, payload) => axios.put(`${resource}/${id}`, payload)
export const GetEmployeeInfo = (id) => axios.get(`${resource}/get_user/${id}`)
export const changeStatus = (payload) => axios.put(`${resource}/updateStatus/`, payload)
export const addEmployee = (payload) => axios.post(`${resource}`, payload)

//paid status
export const useBalance = (payload) => axios.put(`/paid_status/use`, payload)
//roles
export const GetAllRoles = () => axios.get(`/roles`)

// add consumable holidays
export const AddEmployeeConsumableHolidays = (payload) => axios.post(`${resource}/increase_users_holidays`, payload)

export const GetUserDemand = (userId) => axios.get(`/demands/${userId}`)
// demands
export const UpdateUserDemand = (payload) => axios.post('/holidays/update_demands', payload)
//attendances
export const AddEmployeeAttendance = (payload) => axios.post(`/attendances`, payload)
export const GetEmployeeAttendance = () => axios.get(`/attendances`)
export const UpdateEmployeeAttendance = (id, payload) => axios.put(`/attendances/${id}`, payload)
export const DeleteEmployeeAttendance = (id) => axios.delete(`/attendances/${id}`)

// change email
export const ChangeEmailSendToken = (payload) => axios.post(`${resource}/change_email`, payload)
export const UpdateEmail = (payload) => axios.post(`${resource}/update_new_email`, payload)
