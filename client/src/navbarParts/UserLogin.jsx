import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import {useUserContext}  from "../context/userContext.jsx";
import {button1, button} from "../css/style.jsx";

export default function UserLogin() {
  
    const [toggleMenu, setToggleMenu] = useState(false);
    const {userFromLocal,  handleUserLogoutSubmit} = useUserContext();
    
    const navigate = useNavigate(); 
  
    const handleToggle = () => {
      setToggleMenu(!toggleMenu);
    };

    
  
    const handleLogout = () => {
      navigate('/login');
    };
  return (
    <>
         <div className="hidden md:flex space-x-2">
          {userFromLocal ? (<div className='flex items-center gap-2 flex-col'>
            <span className="text-black font-semibold">Welcome:<span className="text-black "> {userFromLocal.name}</span></span>
            <button onClick={handleUserLogoutSubmit} className={button}>Logout</button>

          </div>) :(<>
          
            <Link to="/register" className={button}>Register</Link>
            <Link to="/login" className={button}>Login</Link>
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
      <Link to="/register" className={button1}>Register</Link>
      <Link to="/login" className={button1}>Login</Link>
      <button onClick={handleLogout} className={button1}>Logout</button>
    </div>
  </div>
)}
    </>
  )
}
