import React from 'react';
import {Route, Switch, Redirect }from 'react-router-dom';
import { connect } from 'react-redux';

import Homepage from './pages/home/homepage.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-aign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

import './App.css';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if( userAuth) {
        const userRef = await createUserProfileDocument( userAuth);

        console.log("USERREF:", userRef);
        userRef.onSnapshot( snapShot => {
          console.log("ONSNAPSHOT:", snapShot.data());
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      console.log("USER_AUTH", userAuth);
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    const {currentUser} = this.props;
    return (
      <div>
        <Header/>
        <Switch>
          <Route 
            exact 
            path = '/' 
            render={()=>
              currentUser ? (
                <Homepage />
              ) : (
                <SignInAndSignUpPage/>
              )
            }
          />
          <Route 
            exact
            path = '/SignIn' 
            render={()=>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            } 
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
