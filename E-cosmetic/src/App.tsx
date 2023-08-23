import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/HomePage/header/header';
import Home from './pages/HomePage/home/home';
import Footer from './pages/HomePage/footer/footer';
import Detail from './pages/HomePage/detail/detail';
import Register from './pages/HomePage/register/register';
import Login from './pages/HomePage/login/login';
import BreadcrumbComponent from './component/atoms/breadcrumb/breadcrumb';


function App() {
  return (

<Router>
  <Routes>
  <Route path="/sign-in" element={<Login />} />
  <Route path="/sign-up" element={<Register />} /> 
  <Route path="*" element={<PageUser />} />
   <Route path="/products/:product_name/:id" element={<Pagedetail />} />
  </Routes>
</Router>

  );
}
 function PageUser() {
  return (
    <>
    <Header/>

      <Routes>

<Route path="/" element={<Home />} />

</Routes>
<Footer/>

</>
  );
}
function Pagedetail() {
  return (
    <>
    <Header/>
    <BreadcrumbComponent></BreadcrumbComponent>
      <Routes>

<Route path="/" element={<Detail />} />

</Routes>
<Footer/>

</>
  );
}
export default App;