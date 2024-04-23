import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CarouselSlider from "../../components/CarouselSlider/CarouselSlider"
export const WrapperBrandProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
    
    margin-top: 115px;
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

export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top: 10px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-family: 'poppins', sans-serif;
`
export const StyledCarouselSlider = styled(CarouselSlider)`
  margin-bottom: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  
  max-width: 1270px;
  height: 1000px; /* Hoặc thay đổi theo chiều cao mong muốn */
  background-color: #efefef;
`;

export const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

