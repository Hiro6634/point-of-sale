import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from './context/cart.context.jsx';
import { ProductsProvider } from './context/product.context.jsx';
import { UserProvider } from './context/user.context.jsx';

import App from './App.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>,
)
