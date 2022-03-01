import axios from '@/plugins/axios';
let resource = '/rtts'

export const GetAllRtts = () => axios.get(`${resource}`)
export const GetPendingRtts = () => axios.get(`${resource}/all_pending`)

export const DeclineRtt = (payload) => axios.post(`${resource}/decline_request`, payload)
export const ApproveRtt = (id) => axios.get(`${resource}/approve_request/${id}`)

export const CreateRtt = (payload) => axios.post(`${resource}/admin_create_rtt`, payload)
export const UpdateRtt = (id, payload) => axios.post(`${resource}/update_rtt/${id}`, payload)
export const DeleteRtt = (id) => axios.delete(`${resource}/${id}`)