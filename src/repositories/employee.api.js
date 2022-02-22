import axios from '@/plugins/axios';
let resource = '/users'

export const GetAllEmployees = () => axios.get(`${resource}`)
export const GetCenterInfo = (id) => axios.get(`${resource}/${id}`)

export const UpdateInfo = (id, payload) => axios.put(`${resource}/${id}`, payload)
export const GetAllEmployeesSort = () => axios.get(`user/getAllUser`)
export const DeleteEmployee = (id) => axios.delete(`${resource}/${id}`)
export const UpdateEmployee = (id, payload) => axios.put(`${resource}/${id}`, payload)
export const GetEmployeeInfo = (id) => axios.get(`${resource}/get_user/${id}`)
export const changeStatus = (payload) => axios.put(`${resource}/updateStatus/`, payload)
export const addEmployee = (data) => axios.post(`${resource}`, data)

//roles
export const GetAllRoles = () => axios.get(`/roles`)

// add consumable holidays
export const AddEmployeeConsumableHolidays = (payload) => axios.post(`${resource}/increase_users_holidays`, payload)

// demands
export const GetUserDemand = (userId) => axios.get(`/demands/${userId}`)
// demands
export const UpdateUserDemand = (payload) => axios.post('/holidays/update_demands', payload)
//attendances
export const AddEmployeeAttendance = (payload) => axios.post(`/attendances`, payload)
export const UpdateEmployeeAttendance = (id, payload) => axios.put(`/attendances/${id}`, payload)
export const DeleteEmployeeAttendance = (id) => axios.delete(`/attendances/${id}`)
