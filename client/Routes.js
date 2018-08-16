import universal from 'react-universal-component'
const Home = universal(import('./components/Home'))
const Profile = universal(import('./components/Profile'))
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