import React from 'react';
import { HomePageContainer } from './homepage.styles';
import MenuBuilder from '../../components/menu-builder/menu-builder.component';

const Homepage = () => {
    console.log("I'm in HomePage!");
    return(
    <HomePageContainer>
        <MenuBuilder/>
        <h2>Resume</h2>
    </HomePageContainer>
)}
export default Homepage;