import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import {useAdminContext}  from "../context/adminContext.jsx";
import {button1, button} from "../css/style.jsx";

export default function AdminLogin() {
  
    const [toggleMenu, setToggleMenu] = useState(false);
    const {adminFromLocal,   handleAdminLogoutSubmit} = useAdminContext();
    
    const navigate = useNavigate(); 
  
    const handleToggle = () => {
      setToggleMenu(!toggleMenu);
    };

  
    const handleAdminLogout = () => {
      navigate('/admin-login');
    };
  return (
    <>
         <div className="hidden md:flex space-x-2">
          {adminFromLocal ? (<div className='flex items-center gap-2 flex-col'>
            <span className="text-black font-semibold">Welcome Admin:<span className="text-black "> {adminFromLocal.name}</span></span>
            <button onClick={handleAdminLogoutSubmit} className={button}>Logout</button>

          </div>) :(<>
          
            <Link to="/admin-register" className={button}>Register</Link>
            <Link to="/admin-login" className={button}>Login</Link>
          </>)}
        </div>


        <button className={`${button} md:hidden`} onClick={handleToggle}>
  Menu
</button>

      

      {toggleMenu && (
  <div className="md:hidden p-4">
    <div className="flex flex-col space-y-2">
      <Link to="/" className={button1}>Home</Link>
      <Link to="/products" className={button1}>Products</Link>
      <Link to="/admin-register" className={button1}>Register</Link>
      <Link to="/admin-login" className={button1}>Login</Link>
      <button onClick={handleAdminLogout} className={button1}>Logout</button>
    </div>
  </div>
)}
    </>
  )
}
