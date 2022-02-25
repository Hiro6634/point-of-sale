//import { MenuActionTypes } from './menu.types';

/*const INITIAL_STATE = {
    categories:[
        {
            id: 1,
            name: 'nihonryori',
            color: ''
        },
        {
            id: 2,
            name: 'parrilla',
            color: 'cyan'
        },
        {
            id: 3,
            name: 'bebidas',
            color: 'yellow'
        }
    ],
    foods: [
        {
            id:1001,
            category:'nihonryori',
            name: 'UDON',
            price: '300',
            enable: 'true'
        },
        {
            id:1002,
            category:'nihonryori',
            name: 'YAKITORI X3',
            price: '150',
            enable: 'true'
        },
        {
            id:1003,
            category:'nihonryori',
            name: 'HARUMAKI X3',
            price: '130',
            enable: 'true'
        },
        {
            id:2001,
            category:'parrilla',
            name: 'CHORIPAN',
            price: '150',
            enable: 'true'
        },
        {
            id:2002,
            category:'parrilla',
            name: 'BONDIOLA',
            price: '180',
            enable: 'true'
        },
        {
            id:2003,
            category:'parrilla',
            name: 'HAMBURGUESA',
            price: '150',
            enable: 'true'
        },
        {
            id:3001,
            category: 'bebidas',
            name: 'AGUA',
            price: '60',
            enable: 'true'
        },
        {
            id:3002,
            category: 'bebidas',
            name: 'SBORIZADA',
            price: '70',
            enable: 'true'
        },
        {
            id:3003,
            category: 'bebidas',
            name: 'CERVEZA',
            price: '100',
            enable: 'true'
        }
    ]
}*/

const INITIAL_STATE = {
    foods: [
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

const menuReducer = (state=INITIAL_STATE, action) => {
    console.log(state);
    switch(action.type){
        default:
            return state;
    }
}


export default menuReducer;