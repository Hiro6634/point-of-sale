import React from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

import CustomButton from '../../components/custom-button/custom-button.component';
import { 
    HelpPageContainer,
    HelpTitleContainer,
    HelpTextContainer,
    HelpButtonsContainer
 } from './help.styles';

const HelpPage = ({history}) => (
    <HelpPageContainer>
        <HelpTitleContainer>Punto de Venta</HelpTitleContainer>
        <HelpTextContainer>En la parte superior  tocando el nombre del producto se suma a la venta.</HelpTextContainer>
        <HelpTextContainer>Cuando se desea eliminar un  articul presionar la cruz al final de la linea</HelpTextContainer>   
        <HelpTextContainer>Antes de imprimir la venta se hace una confirmación, desde alli se puede volver para EDITAR, CANCELAR la orden o CONFIRMARLA</HelpTextContainer>     
        <HelpButtonsContainer>
            <CustomButton onClick={()=>history.goBack()}>VOLVER</CustomButton>
        </HelpButtonsContainer>
    </HelpPageContainer>
);

export default withRouter(HelpPage);