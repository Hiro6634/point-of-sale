import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './context/cart.context.jsx';
import { ProductsProvider } from './context/product.context.jsx';
import { TicketProvider } from './context/ticket.context.jsx';
import { UserProvider } from './context/user.context.jsx';

import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <TicketProvider>
              <App />
            </TicketProvider>
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
    <ToastContainer />
  </>
)
