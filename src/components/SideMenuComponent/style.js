import styled from "styled-components";
import { Menu, Select } from 'antd';

export const StyledMenu = styled(Menu)`
  & .ant-menu-item-group-title {
    font-family: poppins, sans-serif;
    font-size: 18px; 
    color: black;
    
  }

  & .ant-select-selection-placeholder,
  & .ant-select-item-option-content {
    font-family: poppins, sans-serif; 
    font-size: 16px;
    color: black; 
  }

  & hr {
    border-top: 2px solid #ccc;
    //margin: 10px 0;
  }
  & .anticon {
   // margin-right: 8px; /* Khoảng cách giữa biểu tượng và tiêu đề */
  }
`;
