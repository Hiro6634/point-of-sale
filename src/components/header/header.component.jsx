import React from 'react';
import { connect } from 'react-redux';

import {ReactComponent as Logo} from '../../assets/logo.svg'
import { auth } from '../../firebase/firebase.utils';

import { 
    HeaderContainer,
    LogoContainer,
    OptinosContainer,
    OptionLink
 } from './header.styles';

const Header = ({currentUser}) => {
    console.log("Drawing Header");
    console.log("currentuser:", currentUser);

    return(
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo'/>
            </LogoContainer>
            <OptinosContainer>
                <OptionLink to='/config'>
                    CONFIG
                </OptionLink>
                {
                    currentUser ?
                        <OptionLink as='div' onClick={() => auth.signOut()}>
                            SIGN OUT
                        </OptionLink>
                        :
                        <OptionLink to='/signin'>
                            SIGN IN
                        </OptionLink>
                }
            </OptinosContainer>
        </HeaderContainer>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header); 

