import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

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
import SelectAddress from './screen/Address/Select/SelectAddress.jsx'
import Success from './screen/Payment/success/Success.jsx'
import OrderList from './screen/Order/OrderList.jsx'
import Checkout from './screen/CheckOut/CheckOut.jsx'

import AdminHome from './screen/Admin/Home/AdminHome.jsx'

import { ROLES } from './config/Roles.jsx'
import RequireAuth from './hooks/RequireAuth.jsx'

import Layout from './components/Layout/Layout.jsx'
import DashLayout from './components/Layout/DashLayout.jsx'
import AdminLayout from './components/Layout/AdminLayout.jsx'
import BasketList from './screen/Admin/Basket/List/BasketList.jsx'
import BasketEdit from './screen/Admin/Basket/Edit/BasketEditForm.jsx'
import AddBasket from './screen/Admin/Basket/Add/AddBasketForm.jsx'

import FlowerList from './screen/Admin/Decoration/Flower/List/FlowerList.jsx'
import EditFlower from './screen/Admin/Decoration/Flower/Edit/EditFlowerForm.jsx'
import AddFlower from './screen/Admin/Decoration/Flower/Add/AddFlower.jsx'

import RibbonList from './screen/Admin/Decoration/Ribbon/List/RibbonList.jsx'
import EditRibbon from './screen/Admin/Decoration/Ribbon/Edit/EditRibbonForm.jsx'
import AddRibbon from './screen/Admin/Decoration/Ribbon/Add/AddRibbon.jsx'

import BowList from './screen/Admin/Decoration/Bow/List/BowList.jsx'
import EditBow from './screen/Admin/Decoration/Bow/Edit/EditBowForm.jsx'
import AddBow from './screen/Admin/Decoration/Bow/Add/AddBow.jsx'

import DrinkList from './screen/Admin/Product/List/DrinkList.jsx'
import EditDrink from './screen/Admin/Product/Edit/EditDrink.jsx'
import AddDrink from './screen/Admin/Product/Add/AddDrink.jsx'

import FruitList from './screen/Admin/Product/List/FruitList.jsx'
import EditFruit from './screen/Admin/Product/Edit/EditFruit.jsx'
import AddFruit from './screen/Admin/Product/Add/AddFruit.jsx'

import CardList from './screen/Admin/Card/List/CardList.jsx'
import EditCard from './screen/Admin/Card/Edit/EditCard.jsx'
import AddCard from './screen/Admin/Card/Add/AddCard.jsx'

import OrderListManage from './screen/Admin/Order/List/OrderList.jsx'
import OrderDetail from './screen/Admin/Order/Detail/OrderDetail.jsx'
import NewOrder from './screen/Admin/Order/newOrder/newOrder.jsx'

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
              {/* Customer Route */}
              <Route path='dash' element={<DashLayout />}>

                <Route index element={<Home />} />

                {/* Customer Routes */}
                <Route>
                  <Route path='home' element={<Home />} />

                  <Route path='address'>
                    <Route index element={<Address />} />
                    <Route path='addAddress' element={<AddAddress />} />
                    <Route path=":id" element={<EditAddress />} />
                  </Route>

                  <Route path='makeBasket'>
                    <Route path='basket' element={<Basket />} />
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
                    <Route path='success/:status' element={<Success />} />
                    <Route path='orderlist' element={<OrderList />} />
                  </Route>

                </Route>

              </Route>

              {/* Admin Route */}
              <Route path='adminDash' element={<AdminLayout />}>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>

                  <Route path='admin'>
                    <Route index element={<AdminHome />} />

                    <Route path='home' element={<AdminHome />} />

                    <Route path='product'>

                      <Route path='basket'>
                        <Route path='basketList' element={<BasketList />} />
                        <Route path='edit/:id' element={<BasketEdit />} />
                        <Route path='add' element={<AddBasket />} />
                      </Route>

                      <Route path='flower' >
                        <Route path='flowerList' element={<FlowerList />} />
                        <Route path='edit/:id' element={<EditFlower />} />
                        <Route path='add' element={<AddFlower />} />
                      </Route>

                      <Route path='ribbon'>
                        <Route path='ribbonList' element={<RibbonList />} />
                        <Route path='edit/:id' element={<EditRibbon />} />
                        <Route path='add' element={<AddRibbon />} />
                      </Route>

                      <Route path='bow'>
                        <Route path='bowList' element={<BowList />} />
                        <Route path='edit/:id' element={<EditBow />} />
                        <Route path='add' element={<AddBow />} />
                      </Route>

                      <Route path='drink'>
                        <Route path='drinkList' element={<DrinkList />} />
                        <Route path='edit/:id' element={<EditDrink />} />
                        <Route path='add' element={<AddDrink />} />
                      </Route>

                      <Route path='fruit'>
                        <Route path='fruitList' element={<FruitList />} />
                        <Route path='edit/:id' element={<EditFruit />} />
                        <Route path='add' element={<AddFruit />} />
                      </Route>

                      <Route path='card'>
                        <Route path='cardList' element={<CardList />} />
                        <Route path='edit/:id' element={<EditCard />} />
                        <Route path='add' element={<AddCard />} />
                      </Route>
                    </Route>

                    <Route path='order'>
                      <Route path='orderListAdmin' element={<OrderListManage />} />
                      <Route path='orderDetail/:id' element={<OrderDetail />} />
                      <Route path='neworder' element={<NewOrder />} />
                    </Route>

                  </Route>
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
