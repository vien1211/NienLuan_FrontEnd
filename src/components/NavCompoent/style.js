import { Row } from "antd";

import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

export const StyledNavbar = styled(Navbar)`
  position: fixed;
  top: 40px;
  width: 1270px;
  z-index: 999;
`;

export const WrapperHeader = styled(Row)`
  font-family: 'poppins', sans-serif;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  width: 1270px;
  padding: 10px 0;
  color: black;
`;

export const SearchStyle = styled.div`
    font-family: 'poppins', sans-serif;
    font-weight: 500;
    //display: flex
    align-items: center;
    justify-content: center; 
`;

export const WrapperTextHeader = styled(Navbar.Brand)`
  font-family: "poppins", sans-serif;
  font-size: 1.5em;
  color: black;
  font-weight: bold;
  text-align: left;
`;

export const ItemHeader = styled.div`
cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
  font-family: "poppins", sans-serif;
  display: flex;
  align-items: center;
  color: black;
  gap: 10px;
  white-space: nowrap;
  max-width: 200px;
`;

export const WrapperTextHeaderSmall = styled.span`
font-family: 'poppins', sans-serif;
  font-size: 12px;
  color: black;
  white-space: nowrap;
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;

export const PopoverContent = styled.div`
  display: flex;
  cursor: pointer;
  
`;

export const Column = styled.div`
  flex: 1;
  margin: 20px
`;

export const StyledWrapperContentPopup = styled.div`
  margin-bottom: 8px;
  font-family: 'poppins', sans-serif;
  white-space: nowrap;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;
