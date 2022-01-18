import view_employee from '@/components/Employès/show'
export default [
    {
        path : '/employees/:id',
        component: view_employee,
        name: 'view_employee',
    },
]