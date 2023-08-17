import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/HomePage/header/header';
import Home from './pages/HomePage/home/home';
import Footer from './pages/HomePage/footer/footer';
import Detail from './pages/HomePage/detail/detail';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:product_name/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;