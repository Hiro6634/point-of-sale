import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth/*, signInWithGoogle*/ } from '../../firebase/firebase.utils';

import { 
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
} from './sign-in.styles';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try{
            await auth.signInWithEmailAndPassword( email, password);
            this.setState({email: '', password: ''})
        }
        catch( error){
            console.error(error);
        }
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({ [name]: value});
    }

    render(){
        return(
            <SignInContainer>
                <SignInTitle>Ingrese su email y password</SignInTitle>
                <form onSubmit={this.handleSubmit}>
                    <FormInput  
                        name="email" 
                        type="email" 
                        label="Email"
                        value={this.state.email} 
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput  
                        name="password" 
                        type="password" 
                        label="Password"
                        value={this.state.password} 
                        handleChange={this.handleChange}
                        required
                    />
                    <ButtonsBarContainer>
                        <CustomButton type='submit' > INGRESAR </CustomButton>
{/*                         <CustomButton type='button' onClick={signInWithGoogle}  isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
 */}                    </ButtonsBarContainer>
                </form>
            </SignInContainer>
        )
    }
}

export default SignIn;