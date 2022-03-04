import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Ticket from '../../components/ticket/ticket.component';
import { clearAllItemsFromCart } from '../../redux/cart/cart.actions';

import { 
    ConfirmPageContainer,
    ConfirmTitleContainer,
    ConfirmButtonsContainer,
    ConfirmButton
} from './confirm.styles';

const ConfirmPage = ({clearAllItems, history}) => (
    <ConfirmPageContainer>
        <ConfirmTitleContainer>VENTA DE VALES</ConfirmTitleContainer>
        <Ticket/>
        <ConfirmButtonsContainer>
            <ConfirmButton onClick={()=>{
                clearAllItems();
                history.push('/');
            }}>
                IMPRIMIR
            </ConfirmButton>
            <ConfirmButton 
                onClick={()=>history.push('/')
            }>
                EDITAR
            </ConfirmButton>
            <ConfirmButton 
                onClick={()=>{
                clearAllItems();
                history.push('/');
            }}>CANCELAR
            </ConfirmButton>
        </ConfirmButtonsContainer>
    </ConfirmPageContainer>
);

const mapDispatchToProps = dispatch => ({
    clearAllItems: () => dispatch(clearAllItemsFromCart())
});

export default withRouter( connect(null,mapDispatchToProps)(ConfirmPage));
