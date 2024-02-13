import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import UserLogin from '../navbarParts/UserLogin';
import AdminLogin from '../navbarParts/AdminLogin';
 import { useUserContext } from '../context/userContext'; 
// import { useAdminContext } from '../context/adminContext'; 
import { button1} from "../css/style.jsx"



 
// const { adminFromLocal } = useAdminContext(); 

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Close the dropdown when a button inside it is clicked
  const closeDropdown = () => setIsDropdownVisible(false);

  

  const { userFromLocal } = useUserContext(); 
  console.log("🚀 ~ userFromLocal:", userFromLocal)
// ADD NAME OF USER IF EXIST
  //const username = userFromLocal.name;
  return (
    <nav className="bg-gradient-to-r from-gray-500 to-gray-900 p-1">
      <div className="container mx-auto flex justify-between items-center">
      
      <div className="flex items-center justify-start max-w-xs m-2">
  <Link to="/" className={`flex items-center space-x-2 ${button1}`}>
    <div>NUR</div>
    {!userFromLocal ? (
      <div>welcome Guest</div>
    ) : (
      <div className="flex items-center text-sm font-semibold">
        <span className="text-gray-100">{userFromLocal.name}</span>
        <span className="text-orange-400 ml-1">shop</span>
      </div>
    )}
  </Link>
</div>


        <div className="hidden md:flex space-x-4">
          <Link to="/" className={button1}>
            Home
          </Link>
          <Link to="/products" className={button1}>
            Products
          </Link>
        </div>
        <div className="relative flex items-center justify-center">
          <button onClick={toggleDropdown} className="text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300">
            Login Options
          </button>
          {isDropdownVisible && (
            <div className="absolute top-full right-0 mt-2 bg-gray-400 shadow-lg rounded-lg p-4 z-10" ref={dropdownRef}>
              <div className="flex flex-col gap-4">
                <div className='flex gap-2 flex-col items-center' onClick={closeDropdown}>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">Admin</h2>
                  <AdminLogin />
                </div>
                <div className='flex gap-2 flex-col items-center' onClick={closeDropdown}>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">User</h2>
                  <UserLogin />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;