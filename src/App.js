import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Intro from './pages/intro'
import Contact from './pages/contact'
import ProductDetail from './pages/product-detail'
import Login from './pages/login'
import RegisterAccount from './pages/register_account'
import PageNotFound from './pages/page-not-found'
import Buy from './pages/buy'
import MyCart from './pages/mycart'
import History from './pages/history'
import Orders from './pages/orders'

function App() {
  const name = localStorage.getItem('name')
  const isAdmin = localStorage.getItem('isAdmin')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/buy" element={<Buy />} />

        {isAdmin==='true' && <Route path="/orders" element={<Orders />} />}

        {localStorage.getItem('name') && (
          <Route path="/mycart" element={<MyCart />} />
        )

        }

        {localStorage.getItem('name') && (
          <Route path="/history" element={<History />} />
        )
        }

        <Route path="/*" element={<PageNotFound />} />



        {
          (!name &&
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterAccount />} />
            </>
          )
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App