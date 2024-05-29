import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from './context/user.context';

import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Tickets from './pages/Tickets';

const Help = () => {
  return (
    <div>
      <h1>Help Page</h1>
    </div>
  )
}

const App = () => {
  const {currentUser} = useContext(UserContext);
  return (
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={currentUser!=null?(<Home/>):(<Login />)} />
          <Route path='/tickets' element={<Tickets/>}/>
          <Route path='/help' element={<Help/>}/>
          <Route path='/auth' element={<Login/>}/>
        </Route>
      </Routes> 
  )
}

export default App
