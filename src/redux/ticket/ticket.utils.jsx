   export const buildTicket = (items, total) => {

    let ticketItems = [];
    items.forEach(function(value,key) {
        console.log("KEY["+key+"]",value)
        ticketItems[key]=value;    
    }); 

/*    items.map((ticketItems, item)=>({
        ...ticketItems, 
        const it = {
            description: item.name,
            price: item.price * item.quantity,
            quantity: item.quantity,
            category: item.category 
        }
    }));    */
    const  ticket = {
        total: total,
        items: ticketItems
    }
    
    return  ticket;
}
