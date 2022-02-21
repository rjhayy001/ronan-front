import axios from '@/plugins/axios';
let resource = '/notice'

export const CreateNotice = (payload) => axios.post(`${resource}`, payload)