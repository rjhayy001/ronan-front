// import view_employee from '@/components/Employès/show'
export default [
    {
        path : '/employees/:id',
        component: () => import(/* webpackChunkName: "employee" */'@/components/Employès/show'),
        name: 'view_employee',
    },
]