import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem 0;
`;

const CopyrightText = styled.p`
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <CopyrightText>
        &copy; 2023 Saurabh Dixit. All rights reserved.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
