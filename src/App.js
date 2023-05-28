import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Help from './routes/help/help.component';
import Authentication from './routes/authentication/authentication.component';

const Config = () => {
    return(
        <div>
            <h1>Config Page</h1>
        </div>
    );
}

const App = () => {
    return( 
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home/>} />
                <Route path='/help' element={<Help/>} />    
                <Route path='/config' element={<Config/>} />
                <Route path='/auth' element={<Authentication/>}/>
            </Route>
        </Routes>
    );
}

export default App;