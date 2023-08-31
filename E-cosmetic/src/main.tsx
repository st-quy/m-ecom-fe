import ReactDOM from 'react-dom/client'
import './main.scss'
import 'antd/dist/reset.css'
import publicRoutes from '../src/routes/public'

import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import React from 'react'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [...publicRoutes]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
