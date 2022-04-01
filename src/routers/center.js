// import view_center from '@/components/Centres/show'
export default [
    {
        path : '/centres/:id',
        component: () => import(/* webpackChunkName: "center" */'@/components/Centres/show'),
        name: 'view_center',
    },
]