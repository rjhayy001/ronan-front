export default [{
        path: '/',
        name: 'Planification',
        component: () => import(/* webpackChunkName: "planning" */'@/components/Planification/index'),
    },

    {
        path: '/centres',
        name: 'Centres',
        component: () => import(/* webpackChunkName: "center" */'@/components/Centres/index'),
    },
    {
        path: '/employees',
        name: 'Employès',
        component: () => import(/* webpackChunkName: "employee" */'@/components/Employès/index'),

    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "auth" */'@/components/Login/login'),
    },
    {
        path: '/parameter',
        name: 'Parameter',
        component: () => import(/* webpackChunkName: "parameter" */'@/components/Profile/parameter'),
        meta: {layout: "Empty"},
    },
    {
        path: '/parameter',
        name: 'Parameter',
        component: () => import(/* webpackChunkName: "parameter" */'@/components/Profile/parameter'),
        meta: {layout: "Empty"},
        
        children: [
            {
                path: 'general',
                name: 'General',
                component: () => import(/* webpackChunkName: "parameter" */'@/components/Profile/include/parameter/include/general'),
                meta: {layout: "Empty"},
            },
            {
                path: 'security',
                name: 'Security',
                component: () => import(/* webpackChunkName: "parameter" */'@/components/Profile/include/parameter/include/security_connection'),
                meta: {layout: "Empty"},
            },
            {
                path: 'management',
                name: 'Management',
                component: () => import(/* webpackChunkName: "parameter" */'@/components/Profile/include/parameter/include/employee_management'),
                meta: {layout: "Empty"},
            },
            {
                path: 'advertise',
                name: 'Advertise',
                component: () => import(/* webpackChunkName: "parameter" */'@/components/Profile/include/parameter/include/advertise'),
                meta: {layout: "Empty"},
            },
            {
                path: 'holidays',
                name: 'Holidays',
                component: () => import(/* webpackChunkName: "parameter" */'@/components/Profile/include/parameter/include/public_holidays'),
                meta: {layout: "Empty"},
            },
            {
                path: 'regions',
                name: 'Regions',
                component: () => import(/* webpackChunkName: "parameter" */'@/components/Profile/include/parameter/include/regions'),
                meta: {layout: "Empty"},
            },
        ]
    },
]