import React from 'react';

import { MenuItemContainer } from './menu-item.styles';

const MenuItem = ({name, color, price}) => (
    <MenuItemContainer onClick={() => (console.log("Click on ", {name}))}>
        <span>{name.toUpperCase()}</span>
        <span> ${price}</span>
    </MenuItemContainer>
);

export default MenuItem;