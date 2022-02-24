import React from 'react';

import MenuItem from '../menu-item/menu-item.component';

class MenuBuilder extends React.Component{
    constructor(){
        super();

        this.state = {
            categories: [
                {
                    id: 1,
                    name: 'nihonryori',
                    color: '#fff888555',
                    menu: [
                        {
                            name: 'UDON',
                            price: '300',
                            enable: 'true'
                        },
                        {
                            name: 'YAKITORI X3',
                            price: '150',
                            enable: 'true'
                        },
                        {
                            name: 'HARUMAKI X3',
                            price: '130',
                            enable: 'true'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'parrilla',
                    color: 'cyan',
                    menu:  [
                        {
                            name: 'CHORIPAN',
                            price: '150',
                            enable: 'true'
                        },
                        {
                            name: 'BONDIOLA',
                            price: '180',
                            enable: 'true'
                        },
                        {
                            name: 'HAMBURGUESA',
                            price: '150',
                            enable: 'true'
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'bebidas',
                    color: 'yellow',
                    menu: [
                        {
                            name: 'AGUA',
                            price: '60',
                            enable: 'true'
                        },
                        {
                            name: 'SBORIZADA',
                            price: '70',
                            enable: 'true'
                        },
                        {
                            name: 'CERVEZA',
                            price: '100',
                            enable: 'true'
                        }
                    ]
                }
            ]
        }
    }

    render(){
        return(
            <div className='menu-builder-container'>
                {
                    this.state.categories.map(({id, ...otherSectionProps}) => (
                        <MenuItem key={id} {...otherSectionProps} />
                    ))
                }
            </div>
        );
    }
}

export default MenuBuilder;