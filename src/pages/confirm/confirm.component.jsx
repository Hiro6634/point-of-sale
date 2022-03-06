import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Ticket from '../../components/ticket/ticket.component';
import { clearAllItemsFromCart } from '../../redux/cart/cart.actions';
import { printTicket } from '../../firebase/firebase.utils';

import { 
    ConfirmPageContainer,
    ConfirmTitleContainer,
    ConfirmButtonsContainer,
    ConfirmButton
} from './confirm.styles';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { buildTicket } from '../../redux/ticket/ticket.utils';

class ConfirmPage extends React.Component{


    handlePrint =  async () => {
        const { currentUser, cartItems, total } = this.props;
    
        await printTicket(currentUser.printer, buildTicket(cartItems, total));

        console.log("Bye");
        this.clearAndHome();
    }

    clearAndHome = () => {
        const {clearAllItems,  history} = this.props;
        clearAllItems();
        history.push('/');

    }
    render(){
        const {clearAllItems, history} = this.props; 

        return(
            <ConfirmPageContainer>
                <ConfirmTitleContainer>VENTA DE VALES</ConfirmTitleContainer>
                <Ticket/>
                <ConfirmButtonsContainer>
                    <ConfirmButton  type='button' onClick={()=>this.handlePrint()}>
                        IMPRIMIR
                    </ConfirmButton>
                    <ConfirmButton type='button'
                        onClick={()=>history.push('/')
                    }>
                        EDITAR
                    </ConfirmButton>
                    <ConfirmButton 
                        type='button'
                        onClick={()=>{
                        clearAllItems();
                        history.push('/');
                    }}>CANCELAR
                    </ConfirmButton>
                </ConfirmButtonsContainer>
            </ConfirmPageContainer>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    clearAllItems: () => dispatch(clearAllItemsFromCart())
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default withRouter( connect(mapStateToProps,mapDispatchToProps)(ConfirmPage));
