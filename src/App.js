import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { UserContext } from "./contexts/user.context";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authenticationcomponent";
import HomePage from "./routes/home/home.component";

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


const App = () => {
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();

  if(!currentUser){
    navigate('/auth');
  }

  return (
    <Routes>
      <Route path='/'element={<Navigation/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/config' element={<Config/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/auth' element={<Authentication/>}/>
      </Route>
    </Routes>
  );
}

export default App;
