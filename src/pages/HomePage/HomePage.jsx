import React, { useState, useEffect } from "react";
import CarouselSlider from "../../components/CarouselSlider/CarouselSlider";
import Container from "react-bootstrap/Container";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import BrandProduct from "../../components/BrandProduct/BrandProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperBrandProduct,
  StyledCarouselSlider,
  CenteredWrapper,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { Link, useNavigate } from "react-router-dom";
import banner1 from "../../assets/images/banner1.webp";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.webp";
import banner4 from "../../assets/images/banner4.webp";
import banner5 from "../../assets/images/banner5.jpg";
import banner6 from "../../assets/images/banner6.jpg";
import banner7 from "../../assets/images/banner7.jpg";
import banner8 from "../../assets/images/banner8.avif";
const images = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  banner7,
  banner8,
];

const HomePage = () => {
  const navigate = useNavigate();
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5); // Số lượng sản phẩm hiển thị ban đầu là 5
  const [typeProducts, setTypeProducts] = useState([]);
  const [brandProducts, setBrandProducts] = useState([]);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const fetchAllBrandProduct = async () => {
    const res = await ProductService.getAllBrand();
    if (res?.status === "OK") {
      setBrandProducts(res?.data);
    }
  };

  const getRandomItems = (items, count) => {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    fetchAllTypeProduct();
    fetchAllBrandProduct();
  }, []);

  const handleBrandItemClick = (brand) => {
    navigate(
      `/brand-product/${brand
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: brand }
    );
  };

  return (
    <Loading isLoading={isLoading || loading}>
      <Container>
        <CenteredWrapper>
          <WrapperBrandProduct>
            {getRandomItems(brandProducts, 6).map((item) => (
              <BrandProduct
                key={item}
                name={item}
                onClick={() => handleBrandItemClick(item)}
              />
            ))}
          </WrapperBrandProduct>
        </CenteredWrapper>
        <div className="body" style={{ position: "relative" }}>
          <CarouselSlider images={images} />
          <h2
            style={{ textAlign: "center", fontFamily: "poppins, sans-serif" }}
          >
            Gợi Ý Cho Bạn
          </h2>
          <WrapperProducts>
            {getRandomItems(products?.data || [], 5).map((product) => (
              <CardComponent
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                brand={product.brand}
                sold={product.sold}
                id={product._id}
              />
            ))}
          </WrapperProducts>
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "20px",
            }}
          >
            <ButtonComponent
              onClick={() => navigate("/all-product")}
              size={40}
              styleButton={{
                background: "#166534",
                height: "48px",
                width: "200px",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                transition: "background-color 0.5s",
              }}
              textbutton={"Xem tất cả sản phẩm"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
                fontFamily: "poppins, sans-serif",
              }}
              hoverStyle={{ background: "#15803d" }}
            />
          </div>
        </div>
      </Container>
      
    </Loading>
    
  );
};

export default HomePage;
