import Centres from '@/components/Centres/index'
import Employès from '@/components/Employès/index'
import Planification from '@/components/Planification/index'
import Login from '@/components/Login/login'
import Parameter from '@/components/Profile/parameter'
import General from '@/components/Profile/include/parameter/include/general'
import Security from '@/components/Profile/include/parameter/include/security_connection'
import Management from '@/components/Profile/include/parameter/include/employee_management'
import Advertise from '@/components/Profile/include/parameter/include/advertise'
import Holidays from '@/components/Profile/include/parameter/include/public_holidays'
import Regions from '@/components/Profile/include/parameter/include/regions'





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
    {
        path: '/parameter',
        name: 'Parameter',
        component: Parameter,
        meta: {layout: "Empty"},
        
        children: [
            {
                path: 'general',
                name: 'General',
                component: General,
                meta: {layout: "Empty"},
            },
            {
                path: 'security',
                name: 'Security',
                component: Security,
                meta: {layout: "Empty"},
            },
            {
                path: 'management',
                name: 'Management',
                component: Management,
                meta: {layout: "Empty"},
            },
            {
                path: 'advertise',
                name: 'Advertise',
                component: Advertise,
                meta: {layout: "Empty"},
            },
            {
                path: 'holidays',
                name: 'Holidays',
                component: Holidays,
                meta: {layout: "Empty"},
            },
            {
                path: 'regions',
                name: 'Regions',
                component: Regions,
                meta: {layout: "Empty"},
            },
        ]
    },
    
    // {
    //     path: '/profile',
    //     name: 'Profile',
    //     component: Profile,
    //     meta: {layout: "Empty"},
    // }
]