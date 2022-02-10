import axios from '@/plugins/axios';
let resource = '/regions'

export const GetAllRegions = () => axios.get(`${resource}`)
export const CreateRegions = (payload) => axios.post(`${resource}`, payload)
export const GetRawRegions = () => axios.get(`${resource}/raw`)

// export const GetCenterInfo = (id) => axios.get(`${resource}/${id}`)
