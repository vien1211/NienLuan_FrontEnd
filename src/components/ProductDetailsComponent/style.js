import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`

export const NameProduct = styled.h1`
    color: rgb(36, 36, 36);
    font-size: 26px;
    font-weight: 500;
    line-height: 32px;
    word-break: break-word;
    font-family: 'poppins', sans-serif;
    background: rgb(250, 250, 250);
     border-radius: 4px;
     padding: 15px;
     margin: 5px;
`

export const DescriptionProduct = styled.h1`
    font-size: 18px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;
    font-family: 'poppins', sans-serif;
    
     padding: 15px;
     margin: 5px;
`

export const TextSell = styled.span`
    font-size: 16px;
    line-height: 24px;
    font-family: 'poppins', sans-serif;
    margin-left: 10px;
`

export const PriceProduct= styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px;
    font-family: 'poppins', sans-serif;
    color: #FF7538
`

export const AddressDelivery = styled.div`
font-family: 'poppins', sans-serif;
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl
    };
    span.change-address {
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
`




export const WrapperInputNumber = styled(InputNumber)`
font-family: 'poppins', sans-serif;
    
        padding: 8px;
        border: 1px solid #007f5; 
        cursor: pointer;
        justify-content: center;
        border-radius: 50%; 
        text-align: center;
        width: 55px; 
        outline: none;
        margin: 10px;
        
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    };
`