import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

function guardRoutes(to, next) {
    const guest_routes = [
        'login'
    ]
    if ((guest_routes.includes(to.name)) && localStorage.getItem('token') === '') {
        next()
    }
    else if(localStorage.getItem('token') === '') {
        next({ name: 'login' })
    }
    else if(guest_routes.includes(to.name) ){
        next({ name: 'dashboard' })
    }
    else {
        next()
    }
  }

  router.beforeEach((to, from, next) => {
        // if(localStorage.getItem('token')) {
        //     Self().then(({data}) => {
        //         store.commit('login', data)
        //         localStorage.setItem('token', data.access_token)
        //         guardRoutes(to, next)
        //     }).catch(err => {
        //         localStorage.removeItem('token')
        //         console.log(err)
        //     })
        // }
        // else {
        //     guardRoutes(to, next)
        // }
        console.log(to,from,guardRoutes)
        next()
  })

export default router