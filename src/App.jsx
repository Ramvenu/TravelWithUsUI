import { useState } from 'react'
import './App.css'
import Login from './Login.jsx'
import Register from './Register.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Register/>
    </>
  )
}

export default App
