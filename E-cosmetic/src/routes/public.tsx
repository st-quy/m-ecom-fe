import Dashboard from '~/component/atoms/dashboard/dashboard'
import PublicLayout from '~/component/templates/PublicLayout'
import Home from '~/pages/HomePage/home/home'
import Login from '~/pages/HomePage/login/login'
import Register from '~/pages/HomePage/register/register'
import UserTable from '~/pages/AdminPage/user/user'
import ProductTable from '~/pages/AdminPage/product/product'
import Category from '~/pages/AdminPage/category/category'
import CartTable from '~/pages/HomePage/cart/cart'
import CheckoutForm from '~/pages/HomePage/payment/payment'
import Service from '~/pages/HomePage/service/service'
import Detail from '~/pages/HomePage/detail/detail'
import About from '~/pages/About Us/about'
// function Cart() {
//   return (
//     <>
//       <Header />
//       <BreadcrumbComponent></BreadcrumbComponent>
//       <Routes>
//         <Route path='*' element={<CartTable />} />
//       </Routes>
//       <Footer />
//     </>
//   )
// }
const routes = [
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/sign-in', element: <Login /> },
      { path: '/sign-up', element: <Register /> },
      {
        path: '/',
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'user',
            element: <UserTable />
          },
          {
            path: 'product',
            element: <ProductTable />
          },
          {
            path: 'category',
            element: <Category />
          }
        ]
      },
      { path: '/cart/:id', element: <CartTable /> },
      { path: '/checkout/:id', element: <CheckoutForm /> },
      { path: '/service', element: <Service /> },
      { path: '/about', element: <About /> },
      { path: '/products/:product_name/:id', element: <Detail /> }
    ]
  }
]

export default routes
