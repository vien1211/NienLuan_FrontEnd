import { Row, Col, header } from 'react-bootstrap';
import styled from "styled-components";

export const StyledHeader = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 999;
`;

export const HeaderInfo = styled(Row)`
    background-color: #007f5f;
    padding: 10px 120px;
    display: flex; 
    font-family: 'poppins', sans-serif;
    font-weight: 400;
    justify-content: center;
`;

export const HeaderInfoText = styled(Col)`
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center; 
    color: #ffff;
    margin: 0 50px;

    @media (max-width: 768px) {
        display: none;
    }
`;
