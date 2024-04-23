import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import {
  ProductListContainer,
  ProductImage,
  ProductTitle,
  ProductItem,
  ReportText,
  StarContainer,
  ProductPrice,
  CartButton,
  CartIcon,
  PriceAndCart,
  StarIcon,
} from "./style";
import { convertPrice } from '../../utils'
import { getSoldCountById } from '../../services/ProductService';

const MAX_NAME_LENGTH = 20; 

const ProductCard = (props) => {
  const { brand, countInStock, description, image, name, price, rating, type, sold, id } = props;
  const [soldCount, setSoldCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoldCount = async () => {
      const soldCount = await getSoldCountById(id);
      setSoldCount(soldCount);
    };
    fetchSoldCount();
  }, [id]);

  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  }

  const shortenName = (name) => {
    if (name.length > MAX_NAME_LENGTH) {
      return name.substring(0, MAX_NAME_LENGTH) + '...';
    }
    return name;
  }

  return (
    
    <ProductListContainer onClick={() =>  handleDetailsProduct(id)}>
      <ProductItem style={{ marginTop: "12px", border: "1px solid #007f5f", borderRadius: "10px" }}>
        <ProductImage variant="top" src={image} />
        <hr style={{ width: '100%', marginTop: '2px 0', borderTop: '1px solid #4D5D53' }} />
        <Card.Body>
          <ProductTitle>{shortenName(name)}</ProductTitle>
          <ReportText>
            <StarContainer>
              <span>{rating}</span>
              <StarIcon className="material-symbols-outlined">grade</StarIcon>
            </StarContainer>
            <span>Đã bán {soldCount}</span>
          </ReportText>
          <PriceAndCart>
            <ProductPrice>{convertPrice(price)}</ProductPrice>
            <CartButton variant="outline-success">
              <CartIcon className="material-symbols-outlined">local_mall</CartIcon>
            </CartButton>
          </PriceAndCart>
        </Card.Body>
      </ProductItem>
    </ProductListContainer>
  );
}

export default ProductCard;
