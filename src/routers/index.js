import Vue from 'vue'
import VueRouter from 'vue-router'
import pages from './pages'
import auth from './auth'
import center from './center'
import employee from './employee'
import { Self } from "@/repositories/auth.api";
import store from '@/store'
Vue.use(VueRouter)

const routes = [
    ...auth,
    ...center,
    ...employee,
    ...pages,
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

function guardRoutes(to, next) {
    const guest_routes = [
        'login',
        'forgotpassword',
        'password-reset',
    ]
    if ((guest_routes.includes(to.name)) && localStorage.getItem('token') === '') {
        next()
    }
    else if(localStorage.getItem('token') === '') {
        next({ name: 'login' })
    }
    else if(guest_routes.includes(to.name) ){
        next({ name: 'Planification' })
    }
    else {
        next()
    }
  }

  router.beforeEach((to, from, next) => {
        if(localStorage.getItem('token')) {
            Self().then(({data}) => {
                store.commit('login', data)
                localStorage.setItem('token', data.access_token)
                guardRoutes(to, next)
            }).catch(err => {
                localStorage.removeItem('token')
                console.log(err)
            })
        }
        else {
            guardRoutes(to, next)
        }
        next()
  })

export default router