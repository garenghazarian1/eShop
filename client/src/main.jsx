import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './Router.jsx'
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './context/userContext.jsx';
import AdminContextProvider from './context/adminContext.jsx';
import ProductContextProvider from './context/addProductContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <AdminContextProvider>
          <UserContextProvider>
            <ProductContextProvider>
             <Router />
            </ProductContextProvider>
          </UserContextProvider>
        </AdminContextProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
