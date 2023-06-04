import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const navigate = useNavigate();
    
    const resetFormFields = () => {
    setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            navigate('/');
        } catch (error) {
            console.log('user sign in failed', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <SignInContainer>
            <h2>Ingrese su email y password</h2>
            <form onSubmit={handleSubmit}>
            <FormInput
                label='Email'
                type='email'
                required
                onChange={handleChange}
                name='email'
                value={email}
            />

            <FormInput
                label='Password'
                type='password'
                required
                onChange={handleChange}
                name='password'
                value={password}
            />
            <ButtonsContainer>
                <Button type='submit'>Ingresar</Button>
            </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
