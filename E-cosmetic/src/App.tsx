import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './pages/HomePage/header/header'
import Home from './pages/HomePage/home/home'
import Footer from './pages/HomePage/footer/footer'
import Detail from './pages/HomePage/detail/detail'
import Register from './pages/HomePage/register/register'
import Login from './pages/HomePage/login/login'
import BreadcrumbComponent from './component/atoms/breadcrumb/breadcrumb'
import Dashboard from './component/atoms/dashboard/dashboard'

import AddProductForm from './pages/AdminPage/product/addproduct'

import CartComponent from './pages/HomePage/cart/cart'
import About from './pages/About Us/about'
import Service from './pages/HomePage/service/service'
import Logout from './pages/HomePage/Logout/logout'
import CartTable from './pages/HomePage/cart/cart'
import CheckoutForm from './pages/HomePage/payment/payment'


function App() {

  return (
    <Router>
      <Routes>
      <Route path="*" element={<Admin />} />
      <Route path='/checkout/:id/*' element={<CheckoutForm />} />

        <Route path='/log-out' element={<Logout />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Service />} />


        <Route path='/cart/:id/*' element={<Cart/>}></Route>
        <Route path='/sign-up' element={<Register />} />
        <Route path='/homepage' element={<PageUser />} />
        <Route path='/products/:product_name/:id' element={<Pagedetail />} />
      </Routes>
    </Router>
  )
}

function Cart() {
  return (
    <>
      <Header />
      <BreadcrumbComponent></BreadcrumbComponent>
      <Routes>
        <Route path='*' element={<CartTable />} />
      </Routes>
      <Footer />
    </>
  )
}function Admin() {
  return (
    <Routes>
      <Route path='*' element={<Dashboard />} />

    </Routes>

  )
}
function PageUser() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}
function Pagedetail() {
  return (
    <>
      <Header />
      <BreadcrumbComponent></BreadcrumbComponent>
      <Routes>
        <Route path='/' element={<Detail />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
