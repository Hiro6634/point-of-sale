import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//import {ReactComponent as Logo} from '../../assets/logo.svg'
import logo from '../../assets/ajb.png'
import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { 
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink,
    LogoImgContainer
 } from './header.styles';

const Header = ({currentUser}) => {
    return(
        <HeaderContainer>
            <LogoContainer to='/'>
                <LogoImgContainer src={logo} alt="logo"/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/help'>
                    AYUDA
                </OptionLink>
                <OptionLink to='/config'>
                    CONF
                </OptionLink>
                {
                    currentUser ?
                        <OptionLink as='div' onClick={() => auth.signOut()}>
                            SALIR
                        </OptionLink>
                        :
                        <OptionLink to='/signin'>
                            INGRESAR
                        </OptionLink>
                }
            </OptionsContainer>
        </HeaderContainer>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});


export default connect(
    mapStateToProps
    )(Header); 

