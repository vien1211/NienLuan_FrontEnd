import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3px;
  white-space: nowrap;
  font-family: 'poppins', sans-serif;
  font-weight: 400;
  align-items: center;
  justify-content: center; 
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
  
`;

export const ProductItem = styled.div`

  transition: transform 0.5s;
  object-fit: cover;
  width: ${props => props.width || '230px'};
  &:hover {
    box-shadow: 0 4px 8px 0 #007f5f;
    transform: scale(1.05); 
  }
  cursor: pointer;
  position: relative; 
  
`;

export const ProductTitle = styled(Card.Title)`
  margin-bottom: 10px;
  margin-left: 5px;
  font-family: 'poppins', sans-serif;
  font-weight: 500;
  
`;

export const ProductPrice = styled(Card.Text)`
  margin-top: 5px;
  margin-left: 5px;
  font-size: 20px;
`;

export const ReportText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 25%;
  align-items: center;
  margin-left: 5px;
  
`;

export const ProductImage = styled(Card.Img)`
width: ${props => props.width || '100%'};
height: ${props => props.height || '200px'};
  object-fit: cover;
`;

export const StarIcon = styled.span`
  color: #FFD700;
  margin-left: 5px;
  margin-right: 5px;
`;

export const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CartButton = styled(Button)`
  
  border-radius: 50%;
  margin-left: ${props => props.marginLeft || '12px'};
  font-size: 14px;
  margin: 0 10px 13px;
  height: ${props => props.height || '3.2em'};
  width: ${props => props.width || '3.2em'};
`;

export const CartIcon = styled.i`
  align-items: center;
  justify-content: center;
  font-size: 20px;


`;

export const PriceAndCart = styled.div`
  display: flex;
  justify-content: space-between;
  
`;