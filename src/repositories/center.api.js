import axios from '@/plugins/axios';
let resource = '/centers'

export const GetAllCenters = () => axios.get(`${resource}`)
export const GetCenterInfo = (id) => axios.get(`${resource}/${id}`)