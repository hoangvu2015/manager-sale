/**
 * Created by yarik on 18.7.17.
 */
import lazyLoading from './lazyLoading'

export default {
    name: 'auth',
    hidden: true,
    path: '/auth/login',
    meta: {
        title: 'Login'
    },
    component: lazyLoading('auth/login/Login')
}