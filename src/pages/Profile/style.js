import { Upload } from "antd";
import styled from "styled-components";

export const TextHeader = styled.h1`
    color: #000;
    font-size: 25px;
    //margin: 5px 0;
    text-align: center;
    
`

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 18px;
    margin: 0px auto;
    justify-content: center;
    font-weight: 600;
    
`
export const ContentProfile = styled.div`
    font-family: "poppins", sans-serif;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 525px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 30px;
    //text-align: center;
    font-size: 18px;
    margin-top: 30px;
    // justify-content: center;
    // align-items: center;
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 15px;
    line-height: 30px;
    font-weight: 600;
    width: 80px;
    text-align: left;
    margin-left: 25px;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
`

