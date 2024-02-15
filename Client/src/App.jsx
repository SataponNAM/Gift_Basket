import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navbar from './components/Navbar.jsx'
import Home from './screen/Home.jsx'
import Login from './screen/Login.jsx'
import Register from './screen/Register.jsx'
import Success from './screen/Success.jsx'

function App() {

  return (
    <>
      <Navbar />

      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/Login' element={<Login />} />

            <Route path='/Register' element={<Register />} />

            <Route path='/success' element={<Success />} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
