import axios from '@/plugins/axios';
let resource = '/regions'

export const GetAllRegions = () => axios.get(`${resource}`)
// export const GetCenterInfo = (id) => axios.get(`${resource}/${id}`)