import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
