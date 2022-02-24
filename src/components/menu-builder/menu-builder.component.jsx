import React from 'react';

import MenuItem from '../menu-item/menu-item.component';

class MenuBuilder extends React.Component{
    constructor(){
        super();

        this.state = {
            food: [
                {
                    id: 1,
                    name: 'UDON',
                    price: 300,
                    category: 'nihonryori',
                    color: '#fff888555'
                },
                {
                    id: 2,
                    name: 'YAKITORI X3',
                    price: 180,
                    category: 'nihonryori',
                    color: '#fff888555'
                }
            ]
        }
    }

    render(){
        return(
            <div className='menu-builder-container'>
                {
                    this.state.food.map(({id, ...otherSectionProps}) => (
                        <MenuItem key={id} {...otherSectionProps} />
                    ))
                }
            </div>
        );
    }
}

export default MenuBuilder;