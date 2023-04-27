import HomePage from '~/pages/home.page'
import LoginPage from '~/pages/login.page'
export const Routes = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/login',
        element: <LoginPage />
    }
]
