import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Ticket from '../../components/ticket/ticket.component';
import { clearAllItemsFromCart } from '../../redux/cart/cart.actions';

import { ConfirmPageContainer } from './confirm.styles';

const ConfirmPage = ({clearAllItems, history}) => (
    <ConfirmPageContainer>
        <h2>VENTA DE VALES</h2>
        <Ticket/>
        <div>
            <button onClick={()=>{
                clearAllItems();
                history.push('/');
            }}>IMPRIMIR</button>
            <button onClick={()=>history.push('/')}>EDITAR</button>
            <button onClick={()=>{
                clearAllItems();
                history.push('/');
            }}>CANCELAR</button>
        </div>
    </ConfirmPageContainer>
);

const mapDispatchToProps = dispatch => ({
    clearAllItems: () => dispatch(clearAllItemsFromCart())
});

export default withRouter( connect(null,mapDispatchToProps)(ConfirmPage));
