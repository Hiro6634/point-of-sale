import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import logo from '../../assets/ajb.png';

import {
    NavigationContainer,
    NavLink,
    NavLinks,
    LogoContainer,
    LogoImgContainer
} from './navigation.styles';


const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <LogoImgContainer src={logo} alt="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/config'>
                        CONFIGURACION
                    </NavLink>
                    <NavLink to='/help'>
                        AYUDA
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>SALIR</NavLink>
                    ):(
                        <NavLink to='/auth'>INGRESAR</NavLink>
                    )}
                </NavLinks>
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;