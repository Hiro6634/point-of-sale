import { selectCollectionsForPreview } from './shop.selectors';

export const incrementShopItem = (collection, id) => {
    const shopCollection = Object.keys(collection).map(key=>collection[key]);
    return shopCollection.map( item => {
        return (item.id === id 
         ? {...item, quantity: item.quantity + 1}
         : item)
        }
    );
}

export const decrementShopItem = (shopCollection, id) => {
    return shopCollection.map( item =>
        item.id === id
            ? (item.quantity > 0 
                ? {...item, quantity: item.quantity - 1}
                : 0)
            : item
    );
}

export const removeShopItem = (shopCollection, id ) => {
    return shopCollection.map( item =>
        item.id === id 
            ? {...item, quantity: 0}
            : item 
    );
}