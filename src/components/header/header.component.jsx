import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {ReactComponent as Logo} from '../../assets/logo.svg'
import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { 
    HeaderContainer,
    LogoContainer,
    OptinosContainer,
    OptionLink
 } from './header.styles';

const Header = ({currentUser}) => {
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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});


export default connect(
    mapStateToProps
    )(Header); 

