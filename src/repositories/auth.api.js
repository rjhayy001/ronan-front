import axios from '@/plugins/axios';

export const login = (payload) => axios.post('login', payload)
export const Self = () => axios.get('self')

// reset password
export const SendEmailToken = (payload) => axios.post('forgotpassword', payload)
export const ResetPassword = (payload) => axios.post('resetpassword', payload)

