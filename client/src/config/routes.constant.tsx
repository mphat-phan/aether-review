import HomePage from "~/pages/home.page";
import LoginPage from "~/pages/login.page";
import RegisterPage from "~/pages/register.page";
export const Routes = [
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    }
]