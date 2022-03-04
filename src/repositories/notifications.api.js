import axios from '@/plugins/axios';
let resource = '/notifications'

export const GetAllNotifications = () => axios.get(`${resource}`)
export const MarkAllAsRead = () => axios.put(`${resource}/mark_all_as_read`)
export const MarkasRead = (id) => axios.get(`${resource}/mark_read/${id}`)
