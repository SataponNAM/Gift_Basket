import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'

import Navbar from './Navbar/Navbar.jsx'
import Login from './Log_Reg/Login.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Login /> 
  );
}

export default App
