import axios from '@/plugins/axios';
let resource = '/notifications'

export const GetAllNotifications = () => axios.get(`${resource}`)
