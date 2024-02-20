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
import { ROLES } from './config/Roles.jsx'
import RequireAuth from './hooks/RequireAuth.jsx'

function App() {

  return (
    <>
      <Navbar />

      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public */}
              <Route path='/home' element={<Home />} />

              <Route path='/Login' element={<Login />} />

              <Route path='/Register' element={<Register />} />

              {/* Protected */}
              <Route element={<PersistLogin />}>
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route element={<Prefetch />}>

                    {/* Customer Routes */}
                    <Route element={<RequireAuth allowedRoles={[ROLES.Customer]} />}>
                      <Route path='/address' element={<Address />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      
                    </Route>

                  </Route> 
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
