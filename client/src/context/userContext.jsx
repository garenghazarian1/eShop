import { baseUrl } from "../config/api";
import React, { createContext, useState, useContext, useEffect} from 'react';
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);
// const {} = useUserContext(); to use it on the components

export const UserContextProvider = ({ children }) => {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState('');
    const [userImage, setUserImage] = useState(null);// we add null because images are binary data  and can't be empty.
    const [previewUrl, setPreviewUrl] = useState('');

    // LOCAL STORAGE ***************************************************
    const [userFromLocal, setUserFromLocal] = useState(() => {
        const storedUserData = localStorage.getItem('userLocalStorage');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });
    
    const navigate = useNavigate();

    // FUNCTION TO REGISTER A USER *******************
    const handleUserRegisterSubmit = async (e)=>{e.preventDefault();
        const formData = new FormData();    // collect the form information to sent´d it to backend
        formData.append('name', name);
        formData.append('age', age);
        formData.append('email', email);
        formData.append('password', password);
        if (userImage) {formData.append('userImage', userImage);} // send image 
        for (const item of formData.entries( ) ){ console.log("🚀 ~ handleUserRegisterSubmit ~ item:", item) };// to show formData debugging purposes

              try {
                const response = await axios.post(`${baseUrl}/user/register`,formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }});
                 if (response.data.success)
                 navigate("/login"); // we can use also window.location.replace(`${baseUrl}/user/login`);
                 setName("");
                 setAge("");
                 setEmail("");
                 setPassword("");
                 setUserImage(null);

                } catch (error) {
                console.error("Error in registration:", error);
            }
        }
    // FUNCTION TO LOGIN A USER *******************
    const handleUserLoginSubmit = async (e) => {
        e.preventDefault();
        const body = { email, password };
    
        try {
            const response = await axios.post(`${baseUrl}/user/login`, body, );
            if (response.data.success) {
                console.log("🚀 ~ handleUserLoginSubmit ~ baseUrl:", baseUrl)
                console.log("🚀 ~ handleLoginSubmit ~ response:", response)
                setLoginError(""); 
                setUserFromLocal(response.data.user); // WE GET DATA:USER WHEN SIGN IN  IS SUCCESSFUL SO THE USER CONTAINS ALL THE INFORMATION ABOUT THE USER
                localStorage.setItem('userLocalStorage', JSON.stringify(response.data.user)); // Store user data in local storage
                navigate("/");
            }
                console.log("🚀 ~ handleUserLoginSubmit ~ setUserFromLocal:", setUserFromLocal)
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setLoginError(error.response.data.message);
            } else {
                setLoginError("An error occurred during login. Please try again.");
            }
        }
    };

    /** 
    //SAVE USERNAME IN LOCAL STORAGE *************************
    useEffect(() => {
        const storedUserData = localStorage.getItem('userLocalStorage');
        //console.log("🚀 ~ useEffect ~ storedUserData:", storedUserData);
    
        // Only attempt to parse storedUserData if it's not null
        if (storedUserData !== null) {
            try {
                const userData = JSON.parse(storedUserData);
                setUserFromLocal(userData);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                // Consider clearing the invalid 'userLocalStorage' item from localStorage if it can't be parsed
                localStorage.removeItem('userLocalStorage');
            }
        }
    }, []);

    */


     // Function to handle user logout
     const handleUserLogoutSubmit = () => {
        setUserFromLocal(null); // Clear user state, using the renamed setter function
        localStorage.removeItem('userLocalStorage'); // Remove user info from localStorage
        navigate('/login'); // Redirect to login page
    };
    
    const handleUserProfileImage = (e) => {
        if (e.target.files[0]) {
          setUserImage(e.target.files[0]);
        }
      };
    
      // EFFECT TO CREATE URL TO PREVIN **********************
      useEffect(() => {
        if (userImage) {
          const objectUrl = URL.createObjectURL(userImage);
          setPreviewUrl(objectUrl);
    
          // Cleanup function to revoke URL to free up memory
          return () => URL.revokeObjectURL(objectUrl);
        }
      }, [userImage]); // This effect runs when userImage changes


return (
    <UserContext.Provider value={{handleUserRegisterSubmit, handleUserLoginSubmit, handleUserLogoutSubmit,handleUserProfileImage, name, setName, age, setAge, email, setEmail, password, setPassword, loginError, setLoginError,userFromLocal, setUserFromLocal, userImage, setUserImage, previewUrl, setPreviewUrl   }}>
        {children}
    </UserContext.Provider>
);
};

export default UserContextProvider;

