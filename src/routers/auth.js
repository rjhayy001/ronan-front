import Login from '@/components/Auth/login.vue'
import Forgotpassword from '@/components/Auth/forgotpassword.vue'
import Passwordreset from '@/components/Auth/password_reset.vue'

export default [
    {
        path: '/login',
        name: 'login',
        meta: {layout: "Empty"},
        component: Login
    },
    {
        path: '/forgotpassword',
        name: 'forgotpassword',
        meta: {layout: "Empty"},
        component: Forgotpassword
    },
    {
        path: '/password-reset',
        name: 'password-reset',
        meta: {layout: "Empty"},
        component: Passwordreset
    }
]