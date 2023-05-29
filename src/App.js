import { Route, Routes } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";

const Home = () => {
  return(
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

const Config = () => {
  return(
    <div>
      <h1>Config Page</h1>
    </div>
  );
}

const Help = () => {
  return(
    <div>
      <h1>Help Page</h1>
    </div>
  );
}

const SignIn = () => {
  return(
    <div>
      <h1>SignIn Page</h1>
    </div>
  );
}

const App = () => {
  return (
    <Routes>
      <Route path='/'element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='/config' element={<Config/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/auth' element={<SignIn/>}/>
      </Route>
    </Routes>
  );
}

export default App;
