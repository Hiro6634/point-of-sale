import React from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import GitInfo from 'react-git-info/macro';

import CustomButton from '../../components/custom-button/custom-button.component';
import { 
    HelpPageContainer,
    HelpTitleContainer,
    HelpTextContainer,
    HelpButtonsContainer
 } from './help.styles';

const gitInfo = GitInfo();

const HelpPage = ({history}) => (
    <HelpPageContainer>
        <HelpTitleContainer>Punto de Venta</HelpTitleContainer>
        <HelpTextContainer>tocando el Icono de arriba ala Izquierda se retorna a la pantalla principal</HelpTextContainer>
        <HelpTextContainer>En la parte superior  tocando el nombre del producto se suma a la venta.</HelpTextContainer>
        <HelpTextContainer>Cuando se desea eliminar un  articul presionar la cruz al final de la linea</HelpTextContainer>   
        <HelpTextContainer>Antes de imprimir la venta se hace una confirmación, desde alli se puede volver para EDITAR, CANCELAR la orden o CONFIRMARLA</HelpTextContainer>     
        <HelpButtonsContainer>
            <CustomButton onClick={()=>history.goBack()}>VOLVER</CustomButton>
        </HelpButtonsContainer>
        <p>{gitInfo.commit.shortHash}</p>
    </HelpPageContainer>
);

export default withRouter(HelpPage);