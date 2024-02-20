import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navbar from './components/Navbar.jsx'
import Home from './screen/Home.jsx'
import Login from './screen/Login.jsx'
import Register from './screen/Register.jsx'
import Address from './screen/AddressList.jsx'
import Layout from './components/Layout.jsx'
import Prefetch from './hooks/Prefetch.jsx'
import PersistLogin from './components/PersistLogin.jsx'

function App() {

  return (
    <>
      <Navbar />

      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='/home' element={<Home />} />

              <Route path='/Login' element={<Login />} />

              <Route path='/Register' element={<Register />} />

              <Route element={<PersistLogin />}>
                <Route element={<Prefetch />}>
                  <Route path='/address' element={<Address />} />
                </Route>
              </Route>
              
            </Route>

          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
