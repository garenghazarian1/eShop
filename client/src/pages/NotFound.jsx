import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
        <p className="text-xl mb-6 text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <button 
          onClick={handleGoHome} 
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Go to Home
        </button>
      </div>
    </div>
);

};

export default NotFound;
