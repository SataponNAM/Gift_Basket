import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Navbar from './components/Navbar/Navbar.jsx'
import Layout from './components/Layout.jsx'
import Prefetch from './hooks/Prefetch.jsx'
import PersistLogin from './screen/Login/PersistLogin.jsx'
import Login from './screen/Login/Login.jsx'
import Register from './screen/Register/Register.jsx'
import Home from './screen/Home/Home.jsx'
import Address from './screen/Address/AddressList.jsx'
import AddAddress from './screen/Address/Add/AddAddress.jsx'
import EditAddress from './screen/Address/Edit/EditAddress.jsx'
import Basket from './screen/MakeBasket/SelectBasket/SelectBasketForm.jsx'
import Decoration from './screen/MakeBasket/SelectDeco/SelectDecoForm.jsx'
import Product from './screen/MakeBasket/SelectProduct/SelectProductForm.jsx'
import Card from './screen/MakeBasket/SelectCard/SelectCardForm.jsx'
import MakeBasket from './screen/MakeBasket/Make/makeGiftBasket.jsx'
import Cart from './screen/Cart/CartList.jsx'
import Checkout from './screen/CheckOut/CheckOut.jsx'
import SelectAddress from './screen/Address/Select/SelectAddress.jsx'
import Payment from './screen/Payment/Payment.jsx'
import Success from './screen/Payment/success/Success.jsx'

import { ROLES } from './config/Roles.jsx'
import RequireAuth from './hooks/RequireAuth.jsx'

import DashLayout from './components/DashLayout.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public */}
        <Route index element={<Login />} />

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />

        {/* Protected */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path='/dash' element={<DashLayout />}>

                {/* Customer Routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Customer]} />}>
                  <Route index element={<Home />} />
                  <Route path='home' element={<Home />} />
                  
                  <Route path='address'>
                    <Route index element={<Address />} />
                    <Route path='addAddress' element={<AddAddress />} />
                    <Route path=":id" element={<EditAddress />} />
                  </Route>

                  <Route path='makeBasket'>
                    <Route path='basket' element={<Basket />}/>
                    <Route path='decoration' element={<Decoration />}></Route>
                    <Route path='product' element={<Product />}></Route>
                    <Route path='card' element={<Card />}></Route>
                    <Route path='giftbasket' element={<MakeBasket />}></Route>
                  </Route>

                  <Route path='cart'>
                    <Route index element={<Cart />} />
                  </Route>

                  <Route path='order'>
                    <Route path='checkout' element={<Checkout />} />
                    <Route path='selectaddress' element={<SelectAddress />} />
                    <Route path='payment' element={<Payment />} />
                    <Route path='success:id' element={<Success />} />
                  </Route>

                </Route>

                {/* Admin Routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>

                </Route>

              </Route>
            </Route>
          </Route>
        </Route>
      </Route>

    </Routes>
  )
}

export default App
