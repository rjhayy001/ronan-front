import axios from '@/plugins/axios';
let resource = '/regions'

export const GetAllRegions = () => axios.get(`${resource}`)
export const CreateRegions = (payload) => axios.post(`${resource}`, payload)
export const GetRawRegions = () => axios.get(`${resource}/raw`)
export const RemoveRegions = (id,payload) => axios.delete(`${resource}/delete/${id}`, payload)
export const SearchRegions = (payload) => axios.post(`${resource}/search` ,payload)
export const GetRegions = (id) => axios.get(`${resource}/${id}`)
export const SortCenters = (payload) => axios.post(`${resource}/sort_centers`, payload)


export const GetAllRegions2 = (payload) => axios.post(`${resource}/test`,payload)


// export const GetCenterInfo = (id) => axios.get(`${resource}/${id}`)
