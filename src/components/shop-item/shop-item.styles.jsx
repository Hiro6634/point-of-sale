import styled from 'styled-components';

export const ShopItemContainer = styled.div`
    width: auto;
    height: 25px;
    display: flex;
    justify-content: space-between;
    padding: 3px 5px;
    cursor: pointer;
`;

export const ShopItemDeleteContainer = styled.div`
    text-transform: capitalize;
    width: 10%;
`;
export const ShopItemDescriptionContainer = styled.span`
    text-transform: capitalize;
    width: 40%;
    padding: 5px;
`;
export const ShopItemDescriptionContainerYl = styled.span`
    text-transform: capitalize;
    width: 40%;
    background-color: yellow;
    padding: 0px 5px;
`;

export const ShopItemDescriptionContainerCy = styled.span`
    text-transform: capitalize;
    width: 40%;
    background-color: cyan;
    padding: 0px 5px;
`;

export const ShopItemDescriptionContainerPk = styled.span`
    text-transform: capitalize;
    width: 40%;
    background-color: #ff8855;
    padding: 0px 5px;
`;

export const ShopItemPriceContainer = styled.span`
    text-transform: capitalize;
    width: 15%;
    padding: 0 5px;
`;

export const ShopItemQuantityContainer = styled.span`
    display: flex;
    text-transform: capitalize;
    align-items: center;
    width: 20%;
`;
