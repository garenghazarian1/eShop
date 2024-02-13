import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Register from "./user/Register";
import Login from "./user/Login";
import AdminRegister from "./admin/AdminRegister";
import AdminLogin from "./admin/AdminLogin";
import Footer from './components/Footer';


function Router() {
  return (
   <>
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-200 via-pink-150 to-gray-300">
  <Navbar className="sticky top-0 z-50" />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin-home" element={<AdminHome />} />
    <Route path="/products" element={<Products />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin-register" element={<AdminRegister />} />
    <Route path="/admin-login" element={<AdminLogin />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  <Footer />
</div>


   
   </>
  );
}

export default Router;
