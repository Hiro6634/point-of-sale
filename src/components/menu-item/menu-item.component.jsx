import React from 'react';
import { connect } from 'react-redux';

import { incMenuItem } from '../../redux/menu/menu.actions';

import { MenuItemContainer } from './menu-item.styles';

const handleClick = (item) => {
    console.log("Click on ", item);
    incMenuItem(item);
}

const MenuItem = ({name, color, price}) => (
    <MenuItemContainer onClick={()=>handleClick({name})}>
        <span>{name.toUpperCase()}</span>
        <span> ${price}</span>
    </MenuItemContainer>
);

const mapDispatchToProps = dispatch => ({
    incMenuItem: (name) => dispatch(incMenuItem(name))
})

export default connect(null, mapDispatchToProps)(MenuItem);