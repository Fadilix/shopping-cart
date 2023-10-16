import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { CartProvider } from './contexts/CartContext.tsx'
import { PriceProvider } from './contexts/TotalPriceContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <PriceProvider>
        <App />
      </PriceProvider>
    </CartProvider>
  </React.StrictMode>,
)
