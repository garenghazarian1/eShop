import { baseUrl } from "../config/api";
import React, { createContext, useState, useContext, useEffect} from 'react';
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext(null);
export const useAdminContext = () => useContext(AdminContext);
// const {} = useAdminContext(); to use it in the components

export const AdminContextProvider = ({ children }) => {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState('');
    // LOCAL STORAGE
    const [adminFromLocal, setAdminFromLocal] = useState("");
    
    const navigate = useNavigate();

    // FUNCTION TO REGISTER A ADMIN *******************
    const handleAdminRegisterSubmit = async (e)=>{e.preventDefault();
        const body = {name, age, email, password};
              try {
                const response = await axios.post(`${baseUrl}/admin/register`,body);
                 if (response.data.success)
                 navigate("/admin-login"); 
                } catch (error) {
                console.error("Error in registration:", error);
            }
        }
    // FUNCTION TO LOGIN A ADMIN *******************
    const handleAdminLoginSubmit = async (e) => {
        e.preventDefault();
        const body = { email, password };
    
        try {
            const response = await axios.post(`${baseUrl}/admin/login`, body);
            if (response.data.success) {
                //console.log("🚀 ~ handleLoginSubmit ~ response:", response)
                setLoginError(""); 
                setAdminFromLocal(response.data.admin);
                navigate("/admin-home");
                localStorage.setItem('adminLocalStorage', JSON.stringify(response.data.admin)); // Store admin data in local storage
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setLoginError(error.response.data.message);
            } else {
                setLoginError("An error occurred during login. Please try again.");
            }
        }
    };

    //SAVE adminNAME IN LOCAL STORAGE *************************
    useEffect(() => {
        const storedAdminData = localStorage.getItem('adminLocalStorage');
        //console.log("🚀 ~ useEffect ~ storedAdminData:", storedAdminData);
    
        // Only attempt to parse storedAdminData if it's not null
        if (storedAdminData !== null) {
            try {
                const adminData = JSON.parse(storedAdminData);
                setAdminFromLocal(adminData);
            } catch (error) {
                console.error('Error parsing admin data from localStorage:', error);
                // Consider clearing the invalid 'adminLocalStorage' item from localStorage if it can't be parsed
                localStorage.removeItem('adminLocalStorage');
            }
        }
    }, []);

     // Function to handle admin logout
     const handleAdminLogoutSubmit = () => {
        setAdminFromLocal(null); // Clear admin state, using the renamed setter function
        localStorage.removeItem('adminLocalStorage'); // Remove admin info from localStorage
        navigate('/login'); // Redirect to login page
    };
    


return (
    <AdminContext.Provider value={{handleAdminRegisterSubmit, handleAdminLoginSubmit, handleAdminLogoutSubmit, name, setName, age, setAge, email, setEmail, password, setPassword, loginError, setLoginError,adminFromLocal, setAdminFromLocal   }}>
        {children}
    </AdminContext.Provider>
);
};

export default AdminContextProvider;

