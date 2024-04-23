import { Col, Image, Rate, Row } from "antd";
import React from "react";
import imageProductSmall from "../../assets/images/imagesmall.webp";
import {
  WrapperStyleImageSmall,
  WrapperStyleColImage,
  NameProduct,
  DescriptionProduct,
  TextSell,
  PriceProduct,
  AddressDelivery,
  QuantityProduct,
  WrapperInputNumber,
  WrapperBtnQualityProduct,
} from "./style";
import { PlusOutlined, MinusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import { useEffect } from "react";
import * as message from "../Message/Message";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";
import { useMemo } from "react";

const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  useEffect(() => {
    if (order.isSucessOrder) {
      message.success("Đã thêm vào giỏ hàng");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSucessOrder]);

  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const { isLoading, data: productDetails } = useQuery(
    ["product-details", idProduct],
    fetchGetDetailsProduct,
    { enabled: !!idProduct }
  );
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      // {
      //     name: { type: String, required: true },
      //     amount: { type: Number, required: true },
      //     image: { type: String, required: true },
      //     price: { type: Number, required: true },
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: 'Product',
      //         required: true,
      //     },
      // },
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInstock: productDetails?.countInStock,
              sold: productDetails?.sold,
            },
          })
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  const totalRatings = useMemo(() => {
    return Object.values(productDetails?.numberOfRatings || {}).reduce(
      (total, rating) => total + rating,
      0
    );
  }, [productDetails?.numberOfRatings]);

  const renderRatingPercentage = (rating) => {
    const percentage = (
      ((productDetails?.numberOfRatings?.[rating] || 0) / totalRatings) *
      100
    ).toFixed(2);
    return (
      <div key={rating}>
        <span style={{ fontWeight: "bold" }}>{rating} sao: </span>
        <Rate disabled defaultValue={rating} />
        <span style={{ marginLeft: "5px" }}>{percentage}%</span>
      </div>
    );
  };
  return (
    <Loading isLoading={isLoading}>
      <Row
        style={{
          padding: "16px",
          background: "#fff",
          borderRadius: "4px",
          height: "100%",
        }}
      >
        <Col
          span={10}
          style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
        >
          <Image
            src={productDetails?.image}
            alt="image prodcut"
            preview={true}
          />
        </Col>
        <Col span={14} style={{ paddingLeft: "10px" }}>
          <NameProduct>{productDetails?.name}</NameProduct>
          <div>
            <Rate
              allowHalf
              defaultValue={productDetails?.rating}
              value={productDetails?.rating}
            />
            {/* <TextSell> Đã bán {productDetails?.sold || 0}</TextSell> */}
            <TextSell> Còn {productDetails?.countInStock || 0}</TextSell>
          </div>
          <PriceProduct>{convertPrice(productDetails?.price)}</PriceProduct>
          <p style={{fontSize: "20px", fontWeight: "600", paddingLeft: "15px", margin: "5px", fontFamily: "poppins, sans-serif"}}>Thông tin sản phẩm</p>
          <DescriptionProduct>
            
            {productDetails?.description}
          </DescriptionProduct>
          <AddressDelivery>
            <span>Giao đến </span>
            <span className="address">{user?.address}</span> -
            <span className="change-address">Đổi địa chỉ</span>
          </AddressDelivery>
          {/* <LikeButtonComponent
            dataHref={
              process.env.REACT_APP_IS_LOCAL
                ? "https://developers.facebook.com/docs/plugins/"
                : window.location.href
            }
          /> */}
          <div
            style={{
              margin: "10px 0 20px",
              padding: "10px 0",
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                fontFamily: "poppins, sans-serif",
                fontSize: "16px",
              }}
            >
              Số lượng
            </div>

            <button
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => handleChangeCount("decrease", numProduct === 1)}
            >
              <MinusOutlined
                style={{
                  color: "#000",
                  fontSize: "25px",
                  alignItems: "center",
                }}
              />
            </button>

            <WrapperInputNumber
              onChange={onChange}
              defaultValue={1}
              max={productDetails?.countInStock}
              min={1}
              value={numProduct}
              size="large"
            />

            <button
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                alignItems: "center",
              }}
              onClick={() =>
                handleChangeCount(
                  "increase",
                  numProduct === productDetails?.countInStock
                )
              }
            >
              <PlusOutlined
                style={{
                  color: "#000",
                  fontSize: "25px",
                  alignItems: "center",
                }}
              />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "45px" }}>
            <div>
              <ButtonComponent
                size={60}
                styleButton={{
                  background: "#007f5f",
                  height: "55px",
                  width: "280px",
                  border: "none",
                  borderRadius: "4px",
                }}
                onClick={handleAddOrderProduct}
                textbutton={"Chọn mua"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              ></ButtonComponent>
              {errorLimitOrder && (
                <div style={{ color: "red" }}>Hết hàng</div>
              )}
            </div>
            <ButtonComponent
              size={60}
              styleButton={{
                background: "#fff",
                height: "55px",
                width: "280px",
                border: "1px solid #007f5f",
                borderRadius: "4px",
                
              }}
              textbutton={"Mua trả góp"}
              styleTextButton={{ color: "#007f5f", fontSize: "15px" }}
            ></ButtonComponent>
          </div>
        </Col>
        {/* <CommentComponent
          dataHref={
            process.env.REACT_APP_IS_LOCAL
              ? "https://developers.facebook.com/docs/plugins/comments#configurator"
              : window.location.href
          }
          width="1270"
        /> */}
      </Row>
      <hr style={{ width: '100%', marginTop: '2px 0', borderTop: '1px solid #4D5D53' }} />
      <Row
        style={{
          padding: "16px",
          background: "#fff",
          borderRadius: "4px",
          height: "100%",
          fontFamily: "poppins, sans-serif",
          
        }}
      >
        <Col span={10} style={{ paddingLeft: "20px", margin: "10px"}}>
          <div>
            <span style={{ fontWeight: "bold" }}>Số sao trung bình: </span>
            <Rate
              disabled
              allowHalf
              defaultValue={productDetails?.averageRating || 0}
            />
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Tổng số lượt đánh giá:</span>
            <span style={{ marginLeft: "5px" }}>{totalRatings}</span>
          </div>
          {[5, 4, 3, 2, 1].map((rating) => renderRatingPercentage(rating))}
        </Col>

        {/* Cột đánh giá */}
        <Col span={14} style={{ paddingLeft: "10px" }}>
          {/* Component đánh giá */}
          <CommentComponent
            dataHref={
              process.env.REACT_APP_IS_LOCAL
                ? "https://developers.facebook.com/docs/plugins/comments#configurator"
                : window.location.href
            }
            width="100%"
          />
        </Col>
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
