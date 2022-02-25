import { MenuActionTypes } from './menu.types';

export const incMenuItem = name => ({
    type: MenuActionTypes.INC_MENU_ITEM,
    payload: name
});