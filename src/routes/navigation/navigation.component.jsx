import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import logo from '../../assets/ajb.png';

import {
    NavigationContainer,
    NavLink,
    NavLinks,
    LogoContainer,
    LogoImgContainer
} from './navigation.styles';


const Navigation = () => {
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
                    <NavLink to='/auth'>
                        SIGN IN
                    </NavLink>
                </NavLinks>
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;