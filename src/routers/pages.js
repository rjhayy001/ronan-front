import Centres from '@/components/Centres/index'
import Employès from '@/components/Employès/index'
import Planification from '@/components/Planification/index'



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
        path: '/employès',
        name: 'Employès',
        component: Employès
    }
]