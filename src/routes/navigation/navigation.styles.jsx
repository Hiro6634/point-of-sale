import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigatioContainer = styled.div`
height: 70px;
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 5px;

`;

export const LogoContainer = styled(Link)`
height: 100%;
width:75px;
padding: 5px;
`;

export const LogoImgContainer = styled.img`
    width: 60px;
`;

export const NavLinksContainer = styled.div`
width: 85%;
height: 100%;
display: flex;
align-items: center;
justify-content: flex-end;
`;

export const NavLink = styled(Link)`
padding: 10px 15px;
cursor: pointer;
`;