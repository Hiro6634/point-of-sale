import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import logo from '../../assets/LogoFlock.png'
// import logo from '../../assets/ajb.png'
import { 
    NavigatioContainer, 
    LogoContainer,
    LogoImgContainer,
    NavLinksContainer,
    NavLink
 } from "./navigation.styles";

const Navigation = () => {
    return(
        <Fragment>
            <NavigatioContainer>
                <LogoContainer to='/'>
                    <LogoImgContainer src={logo} alt='logo'/>
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='/help'>AYUDA</NavLink>
                    <NavLink to='/config'>CONFIG</NavLink>
                </NavLinksContainer>
            </NavigatioContainer>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;