import React from 'react'
import LandingPage from './pages/LandingPage';
import "./index.scss"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import ShopPage from './pages/ShopPage';
import { Toaster } from "react-hot-toast"
import PageNotFound from './pages/PageNotFound';

const App: React.FC = () => {

  return (
    <div>
      <Toaster position='top-center' />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path='/cart' Component={CartPage} />
          <Route path="/shop" Component={ShopPage} />
          <Route path="/*" Component={PageNotFound}/>
        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App;