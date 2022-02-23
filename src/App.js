import React from 'react';
import {Route, Switch }from 'react-router-dom';


import Homepage from './pages/home/homepage.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-aign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if( userAuth) {
        const userRef = await createUserProfileDocument( userAuth);

        userRef.onSnapshot( snapShot => {
          this.setState({
            currentUser: {
            id: snapShot.id,
            ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }
      this.setState({currentUser: userAuth});
    });
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
