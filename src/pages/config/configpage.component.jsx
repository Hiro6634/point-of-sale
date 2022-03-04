import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//import FormInput from '../../components/form-input/form-input.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { ConfigPageContainer } from './configpage.styles';

const ConfigPage = ({currentUSer}) => {
    console.log(currentUSer)
    return(
    <ConfigPageContainer>
        <h1>Config</h1>
        <p>{currentUSer.displayName}</p>
        <p>{currentUSer.email}</p>
        <p>{currentUSer.printer}</p>
        <p>{currentUSer.type}</p>
{/*         <FormInput
            name="email"
            type="email"
            label="Email"
            readonly
            value={currentUSer.email}
        />
        {currentUSer.displayname}
        {currentUSer.printer}
 */}    </ConfigPageContainer>    
)};

const mapStateToProps = createStructuredSelector({
    currentUSer: selectCurrentUser
});
export default connect(mapStateToProps)(ConfigPage);