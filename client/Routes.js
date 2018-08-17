import universal from 'react-universal-component'
const Home = universal(import(/* webpackChunkName: 'Home' */ './components/Home'), {
    chunkName: 'Home'
})
const Profile = universal(import(/* webpackChunkName: 'Profile' */ './components/Profile'), {
    chunkName: 'Profile'
})
import Root from './Root'

const routes = [
    {
        component: Root,
        routes: [
            {
                component: Home,
                path: '/',
                exact: true
            },
            {
                component: Profile,
                path: '/profile',
            }
        ]
    }
]

export default routes