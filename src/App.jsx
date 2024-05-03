import { Route, Routes } from 'react-router-dom';

import AppLayout from './layouts/AppLayout';
import Login from './pages/Login';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}


const App = () => {
  return (
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes> 
  )
}

export default App
