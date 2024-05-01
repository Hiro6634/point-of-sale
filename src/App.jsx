import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/help' element={<div><h1>Ayuda</h1></div>} />
        <Route path='/auth' element={<div><h1>Auth</h1></div>} />
      </Routes> 
    </> 
  )
}

export default App
