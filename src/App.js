import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { UserContext } from "./contexts/user.context";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import HomePage from "./routes/home/home.component";
import Help from "./routes/help/help.component";

const Config = () => {
  return(
    <div>
      <h1>Config Page</h1>
    </div>
  );
}



const App = () => {
  const {currentUser} = useContext(UserContext);

  return (
    <Routes>
      <Route path='/'element={<Navigation/>}>
        {currentUser?(<Route index element={<HomePage/>}/>):(<Route index element={<Authentication/>}/>)}
        <Route path='/config' element={<Config/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/auth' element={<Authentication/>}/>
      </Route>
    </Routes>
  );
}

export default App;
