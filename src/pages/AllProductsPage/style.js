import { Col } from "antd"
import styled from "styled-components"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
export const WrapperProducts = styled.div`
    display: flex;
    gap: 25px;
    margin-top:20px;
    flex-wrap: wrap;
    margin-left: 20px;
`

export const WrapperNavbar = styled(Col)`
    background: #fff; 
    margin-right: 10px;
    padding: 10px;
    border-radius: 4px;
    height: fit-content;

    width: 200px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #9255FD;
        span {
            color: #fff;
        }
    }
    width: 100%;
    color: #9255FD;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
    margin-top: 20px;
`