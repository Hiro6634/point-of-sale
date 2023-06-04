import styled from "styled-components";

export const ProductsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const ProductsHeaderContainer = styled.div`
    width: auto;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
`;

export const DescriptionContainer = styled.span`
    text-transform: capitalize;
    width: 40%;
    text-align: center;
`;

export const PriceContainer = styled.span`
    text-transform: capitalize;
    width: 15%;
    text-align: center;
`;

export const QuantityContainer = styled.span`
    text-transform: capitalize;
    text-align: center;
    width: 20%;
`;

export const DeleteContainer = styled.span`
    text-transform: capitalize;
    width: 10%;
    text-align: center;
`;

export const ProductsItemsContainer = styled.div`
    width: auto;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
`;
