import { useState } from 'react'
import router from './config/routes'
import { RouterProvider } from "react-router-dom"
import { UserService } from './services/user.service'
function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
