import React, {useState} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CustomButton from '../custom-button/custom-button.component';
import Ticket from '../ticket/ticket.component';
import { printTicket, updateStock } from '../../firebase/firebase.utils';
import { buildTicket } from '../../redux/ticket/ticket.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { withRouter } from 'react-router-dom';
import { 
    CheckoutContainer,
    CheckoutTitleContainer,
    CheckoutButtonsContainer
 } from './checkout.styles';

 import { clearAllItemsFromCart } from '../../redux/cart/cart.actions';

const Checkout = ({cartItems, total, history, clearAllItems, currentUser}) => {
    const [disable, setDisable] = useState(false);
    console.log("__CHECKOUT!");
    const handlePrint = (event) => {
        if( disable ){
            return;
        }
        setDisable(true);
        // this.setState({disabled:true});
        updateStocks();
        sendPrint();
    }
    const updateStocks = () => {
        // const { cartItems } = this.props;
        
        cartItems.map( item => {
            console.log("ITEM: " + item.name.toUpperCase() + " Quantity: " + item.quantity);
            return updateStock(item.name.toLowerCase(), item.quantity);
        });
    } 

    const sendPrint =  async () => {
        // const { currentUser, cartItems, total } = this.props;
    
        //console.log("CURRENTUSER:", currentUser);
        await printTicket(currentUser.printer, buildTicket(currentUser, cartItems, total));

        //console.log("Bye");
        clearAndHome();
    }

    const clearAndHome = () => {
        // const {clearAllItems,  history} = this.props;
        clearAllItems();
        history.push('/');
    }    

    return(
    <CheckoutContainer>
        <CheckoutTitleContainer>TICKET</CheckoutTitleContainer>
        <Ticket/>
        <CheckoutButtonsContainer>
            <CustomButton onClick={()=>handlePrint()}>IMPRIMIR</CustomButton>
            {/*<CustomButton onClick={()=>history.push('/confirm')}>IMPRIMIR</CustomButton>*/}
            <CustomButton isGoogleSignIn onClick={()=>clearAllItems()}>CANCELAR</CustomButton>
        </CheckoutButtonsContainer>        
     </CheckoutContainer>

); }

const mapDispatchToProps = dispatch => ({
    clearAllItems: () => dispatch(clearAllItemsFromCart())
})
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
