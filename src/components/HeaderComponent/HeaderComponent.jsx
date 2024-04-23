import React from "react";
import styled from "styled-components";
import { StyledHeader, HeaderInfo, HeaderInfoText } from "./style";

const HeaderComponent = () => {
  return (
    <StyledHeader>
      <HeaderInfo>
        <HeaderInfoText text-center col-md-4>
          <span
            className="material-symbols-outlined"
            style={{ marginRight: "8px" }}
          >
            local_shipping
          </span>
          Miễn Phí Vận Chuyển
        </HeaderInfoText>

        <HeaderInfoText text-center col-md-4>
          <span
            className="material-symbols-outlined"
            style={{ marginRight: "8px" }}
          >
            credit_card
          </span>
          Thanh Toán Tiện Lợi
        </HeaderInfoText>

        <HeaderInfoText text-center col-md-4>
          <span
            className="material-symbols-outlined"
            style={{ marginRight: "8px" }}
          >
            call
          </span>
          Liên hệ: (+84) 776 812 012
        </HeaderInfoText>

        <ResponsiveHeaderInfoText text-center className="col-12">
          <span
            className="material-symbols-outlined"
            style={{ marginRight: "8px" }}
          >
            call
          </span>
          Hãy Liên hệ với chúng tôi
        </ResponsiveHeaderInfoText>
      </HeaderInfo>
    </StyledHeader>
  );
};

const ResponsiveHeaderInfoText = styled(HeaderInfoText)`
  display: none;

  @media (max-width: 767px) {
    display: flex;
  }
`;

export default HeaderComponent;
