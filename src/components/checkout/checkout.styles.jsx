import styled from 'styled-components';

export const CheckoutContainer = styled.div`
    width: 85%;
    min-height: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto 0;
    padding: 5px;
    `;

export const CheckoutTicketContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid darkgrey;
    padding: 10px;
`;
export const CheckoutHeaderContainer = styled.div`
    width: auto;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;
`;

export const HeaderBlockContainer = styled.div`
    text-transform: capitalize;
    width: 23%;

    &:last-child {
        width: 8%
    }
`;

export const TotalContainer = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

export const WarningContainer = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 24px;
  color: red;
`;
