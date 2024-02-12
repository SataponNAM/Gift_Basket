import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navbar from './components/Navbar.jsx'
import Home from './screen/Home.jsx'
import Login from './screen/Login.jsx'
import Register from './screen/Register.jsx'

function App() {

  return (
    <Router>
      <Navbar />

      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/Login' element={<Login />} />

            <Route path='/Register' element={<Register />} />
          </Routes>
        </Container>
      </main>
    </Router>
  )
}

export default App
