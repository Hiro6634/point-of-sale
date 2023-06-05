import styled from "styled-components";

export const ProductItemContainer = styled.div`
    width: auto;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
`;

export const DescriptionContainer = styled.span`
    text-transform: capitalize;
    font-weight: bold;
    width: 40%;
    text-align: left;
    background-color: ${props=>(props.color)};
    text
    /* border: 1px solid gray; */
`;

export const PriceContainer = styled.span`
    text-transform: capitalize;
    width: 15%;
    text-align: right;
    /* border: 1px solid gray; */
`;

export const QuantityContainer = styled.span`
    text-transform: capitalize;
    text-align: center;
    width: 20%;
    /* border: 1px solid gray; */
`;

export const DeleteContainer = styled.span`
    text-transform: capitalize;
    width: 10%;
    text-align: center;
    /* border: 1px solid gray; */
`;
