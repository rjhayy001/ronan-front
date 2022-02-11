import axios from '@/plugins/axios';
let resource = '/rtts'

export const GetAllRtts = () => axios.get(`${resource}`)
