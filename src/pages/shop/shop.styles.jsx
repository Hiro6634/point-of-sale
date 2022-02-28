import styled from 'styled-components';

export const ShopContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const ShopHeaderContainer = styled.div`
    width: auto;
    padding: 10px 0;
    display: flex;
    justify-conent: space-between;
    border-bottom: 1px solid darkgrey;
`;

export const HeaderBlockContainer = styled.div`
    text-transform: capitalize;
    width: 23%;

    &:last-child {
        width: 8%
    }
`;

export const DescriptionContainer = styled.span`
    text-transform: capitalize;
    width: 40%;
`;

export const PriceContainer = styled.span`
    text-transform: capitalize;
    width: 15%;
`;

export const QuantityContainer = styled.span`
    display: flex;
    text-transform: capitalize;
    width: 20%;
`;

export const DeleteContainer = styled.span`
    text-transform: capitalize;
    width: 10%;
`;
