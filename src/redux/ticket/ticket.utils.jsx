   export const buildTicket = (user, items, total) => {

    //console.log("userEmail:"+user.email );
    //console.log("userDisplayName:"+user.displayName );
    //console.log("Total:"+total );
    //console.log("Items:",items );
    const printAt = new Date();
    let ticketItems = [];
    items.map(item=>(
        ticketItems.push ({
            description: item.name,
            price: item.price,
            subtotal: item.price * item.quantity,
            quantity: item.quantity,
            category: item.category 
        })
    ));

    const  ticket = {
        user: {
            email: user.email,
            displayName: user.displayName
        },
        total: total,
        items: ticketItems,
        printAt: printAt
    }

    //console.log("TICKET:", ticket);
    return  ticket;
}
