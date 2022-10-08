import React from 'react';
import {Route, Switch, Redirect }from 'react-router-dom';
import { connect } from 'react-redux';

import Homepage from './pages/home/homepage.component';
import Header from './components/header/header.component';
import HelpPage from './pages/help/help.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-aign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

import './App.css';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

import ConfigPage from './pages/config/configpage.component';
import ConfirmPage from './pages/confirm/confirm.component';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if( userAuth) {
        const userRef = await createUserProfileDocument( userAuth);
        userRef.onSnapshot( snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
//   render(){
//     const {currentUser} = this.props;
//     return (
//       <div>
//         <Header/>
//         <Switch>
//           <Route 
//             exact 
//             path = '/' 
//             render={()=>
//               currentUser ? (
//                 <Homepage />
//               ) : (
//                 <SignInAndSignUpPage/>
//               )
//             }
//           />
//           {
//             currentUser ? (
//               <Route path='/config' component={ConfigPage}/>
//             ):(
//               null
//             )
//           }
//           <Route path='/point-of-sale' render={() => (<Redirect to='/'/>)}/>
//           <Route exact path='/confirm' component={ConfirmPage}/>
//           <Route path='/help' component={HelpPage}/>
//           <Route 
//             exact
//             path = '/SignIn' 
//             render={()=>
//               currentUser ? (
//                 <Homepage/>
//               ) : (
//                 <SignInAndSignUpPage />
//               )
//             } 
//           />
//         </Switch>
//       </div>
//     );
//   }
// }

  render(){
    const {currentUser} = this.props;
    return (
      <div>
        <Header/>
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
