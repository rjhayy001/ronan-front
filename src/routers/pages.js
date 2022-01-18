import Centres from '@/components/Centres/index'
import Employès from '@/components/Employès/index'
import Planification from '@/components/Planification/index'
import Login from '@/components/Login/login'




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
    }
]