import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { createUserProfileDocument, auth } from '../../firebase/firebase.utils';

import { 
    SignUpContainer,
    SignUpTitle,
    SignUpForm
} from './sign-up.styles';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword } = this.state;

        if( password !== confirmPassword ){
            alert("password don't match");
            return;
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword( email, password);

            await createUserProfileDocument( user, {displayName });

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
        catch(error){
            console.error(error);
        }
    };

    handleChange = event => {
        const { name, value} = event.target;

        this.setState({[name]: value});
    }

    render(){
        return(
            <SignUpContainer>
                <SignUpTitle>I do not have a account</SignUpTitle>
                <span>Sign up with your email anda password</span>
                <SignUpForm onSubmit={this.handleSubmit}> 
                    <FormInput
                        type='text'
                        name='displayName'
                        value={this.state.displayName}
                        label='display name'
                        onChange={this.handleChange}
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={this.state.email}
                        label='email'
                        onChange={this.handleChange}
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={this.state.password}
                        label='password'
                        onChange={this.handleChange}
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={this.state.confirmPassword}
                        label='confirm password'
                        onChange={this.handleChange}
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </SignUpForm>
            </SignUpContainer>        
        )
    }
}

export default SignUp;