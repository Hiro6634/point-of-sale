import React from 'react';
import { connect } from 'react-redux';

import MenuItem from '../menu-item/menu-item.component';

const handleClick = (...menuItemData) => {
    console.log('ACASO ESTOY PINTADO')
}

const MenuBuilder = ({menuItems, allState}) => {
    console.log(allState);
    return(
        <div className='menu-builder-container'>
            {
                menuItems.foods.map(({id, ...otherSectionProps}) => (
                    <MenuItem key={id} {...otherSectionProps} onClick={()=>handleClick({...otherSectionProps})}/>
                ))
            }
        </div>
    )  ;
}

const mapStateToProps = state => ({
    menuItems: state.menu,
    allState: state
});

export default connect(mapStateToProps)(MenuBuilder);