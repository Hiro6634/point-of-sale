import React from 'react';
import {Route, Switch }from 'react-router-dom';


import Homepage from './pages/home/homepage.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-aign-up.component';
import { auth } from './firebase/firebase.utils';

import './App.css';


class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user});
 
      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path = '/' component = {Homepage} />
          <Route path = '/SignIn' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
