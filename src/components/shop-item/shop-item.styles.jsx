import styled from 'styled-components';

export const ShopItemContainer = styled.div`
    width: auto;
    height: 35px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items:center;
`;

export const ShopItemDeleteContainer = styled.div`
    text-transform: capitalize;
    width: 5%;
    text-align: center;
`;
export const ShopItemDescriptionContainer = styled.span`
    text-transform: capitalize;
    width: 40%;
    padding: 0px 5px;
`;
export const ShopItemDescriptionContainerYl = styled.span`
    text-transform: capitalize;
    width: 40%;
    background-color: yellow;
    padding: 0px 5px;
    font-weight: bold;
    `;

export const ShopItemDescriptionContainerCy = styled.span`
    text-transform: capitalize;
    width: 40%;
    background-color: cyan;
    padding: 0px 5px;
    font-weight: bold;
    `;

export const ShopItemDescriptionContainerPk = styled.span`
    text-transform: capitalize;
    width: 40%;
    background-color: #ff8855;
    padding: 0px 5px;
    font-weight: bold;
`;

export const ShopItemPriceContainer = styled.span`
    text-transform: capitalize;
    width: 15%;
    padding: 0 25px;
    text-align: right;
`;

export const ShopItemQuantityContainer = styled.span`
    text-transform: capitalize;
    text-align: center;
    width: 20%;
`;
