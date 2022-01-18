import Login from '@/components/Auth/login.vue'

export default [
    {
        path: '/login',
        name: 'login',
        meta: {layout: "Empty"},
        component: Login
    }
]