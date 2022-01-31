import axios from '@/plugins/axios';
let resource = '/planning'

export const Insert = (payload) => axios.post(`${resource}/insert`, payload)