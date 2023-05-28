import React from 'react';
import {createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
// import { ProductsContext } from './context/product.contex';
import './index.css';
import App from './App';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    {/* <ProductsContext> */}
      <App />
    {/* </ProductsContext>     */}
  </BrowserRouter>
);

