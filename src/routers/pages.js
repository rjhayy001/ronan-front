import Centres from '@/components/Centres/index'
import Employès from '@/components/Employès/index'
import Planification from '@/components/Planification/index'
import Login from '@/components/Login/login'
import Parameter from '@/components/Profile/parameter'





export default [{
        path: '/',
        name: 'Planification',
        component: Planification
    },

    {
        path: '/centres',
        name: 'Centres',
        component: Centres
    },
    {
        path: '/employees',
        name: 'Employès',
        component: Employès
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/parameter',
        name: 'Parameter',
        component: Parameter,
        meta: {layout: "Empty"},
    },
    // {
    //     path: '/profile',
    //     name: 'Profile',
    //     component: Profile,
    //     meta: {layout: "Empty"},
    // }
]