import styled from "styled-components";

export const TicketContainer = styled.div`
    width:300px;
    display: flex;
    flex-direction: column;
    min-height: 10vh;
    border: 1px solid darkgrey;
    padding: 5px
`;

export const TicketHeaderContainer=styled.div`
    width:100%;
    border-bottom: 1px solid darkgrey;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-transform: capitalize;
    font-weight: bold;
`;

export const TicketHeaderQuantityContainer=styled.span`
    width: 20%
`;

export const TicketHeaderDescriptionContainer=styled.span`
    width: 60%
`;

export const TicketHeaderPriceContainer=styled.span`
    width: 20%
`;

export const TicketTotal=styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;